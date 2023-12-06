import { createWebHistory, createRouter } from 'vue-router'
import NewCertification from "@/components/certification/NewCertification";
import CertificationList from "@/components/certification/CertificationList";

export const routes = [
    {
        path: '/',
        redirect: '/create-new-certification',
    },
    {
        path: '/create-new-certification',
        name: 'new-certification',
        meta: {layout: 'new-certification'},
        component: NewCertification
    },
    {
        path: '/view-certification',
        name: 'certifications-view',
        meta: {layout: 'certifications-view'},
        component: CertificationList
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})
export default router
