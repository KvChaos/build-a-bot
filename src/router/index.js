import Vue from 'vue';
import Router from 'vue-router';
import HomePage from '../home/HomePage.vue';
import RobotBuilder from '../build/RobotBuilder.vue';
import PartInfo from '../parts/PartInfo.vue';
import BrowseParts from '../parts/BrowseParts.vue';
import RobotHeads from '../parts/RobotHeads.vue';
import RobotArms from '../parts/RobotArms.vue';
import RobotTorsos from '../parts/RobotTorsos.vue';
import RobotBases from '../parts/RobotBases.vue';
import SidebarStandard from '../sidebars/SidebarStandard.vue';
import SidebarBuild from '../sidebars/SidebarBuild.vue';

Vue.use(Router);

const routes = [{
    path: '/',
    name: 'Home',
    components: {
      // The key values here correspond with the names of the router-views
      default: HomePage,
      sidebar: SidebarStandard
    }
  },
  {
    path: '/build',
    name: 'Build',
    components: {
      default: RobotBuilder,
      sidebar: SidebarBuild
    }
  },
  {
    path: '/parts/browse',
    name: 'BrowseParts',
    component: BrowseParts,
    // Child routes; this apparently tells the component that these child routes are to be displayed inside 
    // the component's <router-view>.  See the <router-view> in BrowseParts component.
    children: [{
        name: 'BrowseHeads',
        path: 'heads',
        component: RobotHeads
      },
      {
        name: 'BrowseArms',
        path: 'arms',
        component: RobotArms
      },
      {
        name: 'BrowseTorsos',
        path: 'torsos',
        component: RobotTorsos
      },
      {
        name: 'BrowseBases',
        path: 'bases',
        component: RobotBases
      },
    ]
  },
  {
    path: '/parts/:partType/:id',
    name: 'Parts',
    component: PartInfo,
    props: true // Vue will now pass the route parameters on this route as props instead of route params
  },
];


export default new Router({
  mode: 'history',
  routes
});
