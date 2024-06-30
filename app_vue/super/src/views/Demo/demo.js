import $api from './api';
import { ref, onMounted, watch } from 'vue'

export default function demo(user) {
    const demoData = ref([])
    const logins = async () => {
        console.log('登录')
        const {success, data} = await $api.login(user)
        if (!success) return
        demoData.value=data
        console.log(data)
    }
    onMounted(logins)
    watch(user, logins)

    return {
        demoData,
        logins
    }
}