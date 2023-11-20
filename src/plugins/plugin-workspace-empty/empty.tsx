import React from "react";
import { CommonIcon, ShiftIcon } from './icon';
import './empty.scss';
import { IPublicModelPluginContext } from "@alilc/lowcode-types";

export function Empty(props: {
  pluginContext: IPublicModelPluginContext;
}) {
  return (
    <div className="workspace-empty">
      <div className="workspace-empty-box">
        <div className="workspace-empty-logo">
        <img className="workspace-empty-logo-img" src="/favicon.png"></img>
        </div>
      </div>
    </div>
  )
}