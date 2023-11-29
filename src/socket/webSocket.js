import { fetchAccounts } from "../redux/slice/accountsSlice";
import { fetchTasks } from "../redux/slice/tasksSlice";

const handleWebSocketData = (model, action, data, dispatch) => {
    const modelAction = {
        account: {
            create: () => handleAccountUpdate(data, dispatch),
            update: () => handleAccountUpdate(data, dispatch),
            delete: () => handleAccountUpdate(data, dispatch),
        },
        task: {
            create: () => handleTaskUpdate(data, dispatch),
            update: () => handleTaskUpdate(data, dispatch),
            delete: () => handleTaskUpdate(data, dispatch),
        },
    };

    if (modelAction[model] && modelAction[model][action]) {
        modelAction[model][action]();
    } else {
        console.error(`Invalid model or action: ${model}, ${action}`);
    }
};

const handleAccountUpdate = (data, dispatch) => {
    console.log('Аккаунт обновлен через WebSocket:', data);
    dispatch(fetchAccounts());
};

const handleTaskUpdate = (data, dispatch) => {
    console.log('Задача обновлена через WebSocket:', data);
    dispatch(fetchTasks());
};

export const initWebSocket = (sessionToken, dispatch) => {
    const ws = new WebSocket(`wss://plifal.tech/api/ws?session_token=${sessionToken}`);

    ws.onopen = () => {
        console.log('Connected to server');
    };

    ws.onclose = () => {
        console.log('Disconnected from server');
    };

    ws.onerror = (error) => {
        console.error('WebSocket Error:', error);
    };

    ws.onmessage = (event) => {
        try {
            const jsonData = JSON.parse(event.data);
            if (jsonData.type === 'update') {
                try {
                    const { model, action, data } = jsonData;
                    console.log(`Received WebSocket data - Model: ${model}, Action: ${action}, Data:`, data);
                    handleWebSocketData(model, action, data, dispatch);
                } catch (e) {
                    console.error("Failed to execute modelAction: " + e);
                }
            }
        } catch (error) {
            console.error("Failed to parse JSON data: " + error);
        }
    };

    return ws;
};