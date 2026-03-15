import { chart } from '../expendPlugins/chart/plugin'
import { print } from '../expendPlugins/print/plugin'
import { exportXlsx } from '../expendPlugins/exportXlsx/plugin'
import { importXlsx } from '../expendPlugins/importXlsx/plugin'

const pluginsObj = {
    'chart':chart,
    'print':print,
    'exportXlsx':exportXlsx,
    'importXlsx':importXlsx
}

const isDemo = true

/**
 * Register plugins
 * 
 * plugins:[
 * {name:'chart'},
 * {name:'print'},
 * {name:'exportXlsx',config:{url:''}}
 * ]
 */
function initPlugins(plugins , options){
    if(plugins.length){
        plugins.forEach(plugin => {
            pluginsObj[plugin.name](options, plugin.config, isDemo)
        });
    }
}

export {
    initPlugins
}