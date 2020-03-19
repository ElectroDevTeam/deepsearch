import {
  JupyterFrontEnd, JupyterFrontEndPlugin
} from '@jupyterlab/application';


/**
 * Initialization data for the deepsearch extension.
 */
const extension: JupyterFrontEndPlugin<void> = {
  id: 'deepsearch',
  autoStart: true,
  activate: (app: JupyterFrontEnd) => {
    console.log('JupyterLab extension deepsearch is activated!');
  }
};

export default extension;
