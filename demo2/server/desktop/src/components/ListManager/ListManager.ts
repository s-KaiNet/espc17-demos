import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import * as mongoose from 'mongoose';

import { Site } from '../../db/schema';
import { ISiteModel } from '../../db/site';
import { ISitesData } from '../../common/sitesData';
import QuestionList from '../QuestionList/QuestionList.vue';

@Component({
    components: {
        'question-list': QuestionList
    }
})
export default class ListManager extends Vue {
    public sites: ISitesData[] = [];

    public get computedSites() {
        return this.sites.filter(item => item.questions.length > 0);
    }

    public fullSiteUrl(site: ISitesData): string {
        return `${ROOT_SP_URL}${site.serverRelativeUrl}`;
    }

    public async created() {
        let sites = await this.getAllSites();
        sites.forEach(site => {
            let newSite: ISitesData = {
                serverRelativeUrl: site.serverRelativeUrl,
                title: site.title,
                questions: []
            };

            if (site.questions && site.questions.length > 0) {
                site.questions.forEach(question => {
                    newSite.questions.push({
                        id: question.listItemId
                    })
                })
            }
            this.sites.push(newSite);
        });
    }

    private getAllSites(): Promise<ISiteModel[]> {
        return Site.find({}).populate('questions').exec();
    }
}
