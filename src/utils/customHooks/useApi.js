import { useContext, useEffect, useRef } from 'react';
import { store } from '../../store';
import API from '../../utils/apiUtils';
import { API_BASE_URL } from '../../constants/apiConstants';
import axios from 'axios';

function useApi(
  callMethod = '',
  // successCb = () => {},
  payload = {},
  deps = [],
) {
  const { state, dispatch } = useContext(store);
  let refDeps = useRef(deps);

  useEffect(() => {
    dispatch({ type: 'LOADING' });
    // if (state.decks.length === 0) {
    // Create API instance
    const api = new API({ url: API_BASE_URL.USERDATA[process.env.NODE_ENV] });
    // Create new token for the request
    let source = axios.CancelToken.source(); // TODO: refactor token cancelation inside apiUtils
    console.log('useEffect');
    const fetchData = async () => {
      // TODO: refactor async/await inside apiUtils
      try {
        // Final payload to pass in API call method
        let finalPayload;
        if (
          callMethod === 'getDecksInLang' ||
          callMethod === 'getCardsInLang'
        ) {
          finalPayload = state.currentTargetLang.id;
          refDeps.current = [state.currentTargetLang];
          console.log('inside fetchData');
        } else {
          finalPayload = payload;
        }

        const response = await api[callMethod](finalPayload);
        // TODO: refactor properties inside each deck ("letter" vs "logo", "description", ...)
        // successCb(response.data);
        // TODO 24/04: successCb fn will check callMethod and call a different cb dependending on callMethod

        // GET DECKS IN LANG
        if (callMethod === 'getDecksInLang') {
          const data = response.data.map((el) => ({
            ...el,
            letter: el.name[0].toUpperCase(),
            cards: [],
          }));
          console.log('inside successCb', data);
          dispatch({
            type: 'LOAD_DECKS',
            payload: {
              decks: data,
            },
          });
        }

        // GET CARDS IN LANG
        // dispatch({
        //   type: 'LOAD_CARDS',
        //   payload: {
        //     cards: response.data,
        //   },
        // });

        // ADD DECK
      } catch (error) {
        dispatch({
          type: 'ERROR',
          payload: { error },
        });
        if (!axios.isCancel(error)) {
          throw error;
        }
      }
    };
    fetchData();
    // when unmounting component, cancel axios token
    return () => {
      source.cancel();
    };
  }, refDeps.current);

  return [state, dispatch];
}

export default useApi;
