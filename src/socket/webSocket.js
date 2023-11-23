import { fetchAccounts } from '../redux/slice/accountsSlice';
import { fetchTasks } from '../redux/slice/tasksSlice';


const handleAccountUpdate = (data, dispatch) => {
  console.log('Аккаунт обновлен через WebSocket:', data);
  dispatch(fetchAccounts());
};

const handleTaskUpdate = (data, dispatch) => {
  console.log('Задача обновлена через WebSocket:', data);
  dispatch(fetchTasks());
};

const modelAction = {
    'account': {
      'update': handleAccountUpdate,
    },
    'task': {
      'update': handleTaskUpdate,
    },
  };

const setupWebSocket = (dispatch, sessionToken) => {
  const ws = new WebSocket(`wss://plifal.tech/api/ws?Authorization=${sessionToken}`);

  ws.onmessage = (event) => {
    try {
      const jsonData = JSON.parse(event.data);
      if (jsonData.type === 'update') {
        try {
          const handler = modelAction[jsonData.model]?.[jsonData.action];
          if (handler) {
            handler(jsonData.data, dispatch);
          }
        } catch (e) {
          console.error("Не удалось выполнить обработчик события: " + e);
        }
      }
    } catch (error) {
      console.error("Не удалось разобрать JSON-данные: " + error);
    }
  };

  return ws;
};

export default setupWebSocket;