import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from "@jupyterlab/application";

import { ICommandPalette, MainAreaWidget } from "@jupyterlab/apputils";

import { Widget } from "@lumino/widgets";
import React from "react";
import ReactDOM from 'react-dom';

import SearchPage from './SearchPage';

declare namespace JSX {
  interface Element { }
  interface IntrinsicElements { div: any}
}

function initSearchWidget(content: Widget) {
  let searchHeader = <div>
    <h2>Search Everything!</h2>
    <input
      onChange={(e) => {console.log("New event", e.target)}}
    />
    <SearchPage
    />
  </div>;
  ReactDOM.render(searchHeader, content.node);
}

/**
 * Initialization data for the deepsearch extension.
 */
const extension: JupyterFrontEndPlugin<void> = {
  id: "deepsearch",
  autoStart: true,
  requires: [ICommandPalette],
  activate: (app: JupyterFrontEnd, palette: ICommandPalette) => {
    console.log("JupyterLab extension deepsearch is activated!");
    console.log("ICommandPalette 123:", palette);
    // Create a blank content widget inside of MainAreaWidget
    const content = new Widget();
    const widget = new MainAreaWidget({ content });
    initSearchWidget(content);
    widget.id = "deepsearch";
    widget.title.label = "Deepsearch";
    widget.title.closable = true;

    // Add an application commend
    const command: string = "deepsearch:search";
    app.commands.addCommand(command, {
      label: "Search Everywhere",
      execute: () => {
        if (!widget.isAttached) {
          // Attach the widget to the main work area if it's not there
          app.shell.add(widget, "main");
        }
        // Activate the widget
        app.shell.activateById(widget.id);
      }
    });
    // Add the command to the palette.
    palette.addItem({ command, category: "Search" });
  }
};

export default extension;
