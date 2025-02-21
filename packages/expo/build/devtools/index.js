import { useState, useEffect } from 'react';
import { getDevToolsPluginClientAsync } from './DevToolsPluginClientFactory';
export { getDevToolsPluginClientAsync };
export { setEnableLogging } from './logger';
/**
 * A React hook to get the DevToolsPluginClient instance.
 */
export function useDevToolsPluginClient(pluginName) {
    const [client, setClient] = useState(null);
    const [error, setError] = useState(null);
    useEffect(() => {
        async function setup() {
            try {
                const client = await getDevToolsPluginClientAsync(pluginName);
                setClient(client);
            }
            catch (e) {
                setError(new Error('Failed to setup client from useDevToolsPluginClient: ' + e.toString()));
            }
        }
        async function teardown() {
            try {
                await client?.closeAsync();
            }
            catch (e) {
                setError(new Error('Failed to teardown client from useDevToolsPluginClient: ' + e.toString()));
            }
        }
        setup();
        return () => {
            teardown();
        };
    }, [pluginName]);
    if (error != null) {
        throw error;
    }
    return client;
}
//# sourceMappingURL=index.js.map