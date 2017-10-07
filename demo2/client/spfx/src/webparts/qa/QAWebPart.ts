import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';

import * as Vue from 'vue';
import Accordion from "./components/accordion/Accordion.vue";
import * as strings from 'QAWebPartStrings';
import 'es6-promise';
import 'whatwg-fetch';
import 'keen-ui/dist/keen-ui.css';

export interface IQAWebPartProps {
  description: string;
}

export default class QAWebPartWebPart extends BaseClientSideWebPart<IQAWebPartProps> {

  public render(): void {
    this.domElement.innerHTML = `
    <div id="app-${this.context.instanceId}">
    </div>`;
    // tslint:disable-next-line:no-unused-expression
    new Vue({
      el: `#app-${this.context.instanceId}`,
      render: h => h(Accordion, {
        props: {
          ctx: this.context
        }
      })
    });
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
