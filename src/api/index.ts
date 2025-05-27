import Request, { HttpResponse } from 'luch-request'

// 引入配置
import { useUserStore } from '@/store/modules/user'
import { checkStatus } from './checkStatus'
import { showFullScreenLoading, tryHideFullScreenLoading } from '@/utils/serviceLoading'
import { ApiResponse } from './types/result'

const http = new Request()
http.setConfig((config : any) => {
	/* config 为默认全局配置 */
	config.baseURL = import.meta.env.VITE_BASE_URL_REAL
	config.timeout = 100000
	config.custom = {
		isToken: true, // 接口是否需要鉴权
		noLoading: false, // 是否展示加载动画
	}
	config.header = {
		Accept: 'application/json, text/plain, */*',
		'content-type': 'application/json',
		'X-Requested-With': 'XMLHttpRequest',
	}
	return config
})
/*
 * 请求拦截
 * @param {Object} http
 */
http.interceptors.request.use(
	(config : any) => {
		console.log('config', config)
		config.data = config.data || {}
		const custom = config.custom
		custom.noLoading || showFullScreenLoading()
		console.log(config.url + '的参数：', config.data)
		return config
	},
	(config : any) => Promise.reject(config),
)
/**
 * 响应拦截
 * @param {Object} http
 */
http.interceptors.response.use(
	(response : HttpResponse) => {
		/* 对响应成功做点什么 可使用async await 做异步操作 */
		const data = response.data
		const userStore = useUserStore()
		const token = response.header['X-Auth-Token']
		tryHideFullScreenLoading()
		return data
	},
	async (error : any) => {
		console.log(error)
		tryHideFullScreenLoading()
		try {
			checkStatus(error.data.code, error.data.msg)
		} catch (e) {
			console.log(e)
			const userStore = useUserStore()
			uni.setStorageSync('key', '')
			await userStore.logOut()
		}

		if (error.statusCode === 401) {
			const userStore = useUserStore()
		}
		return Promise.reject(error)
	},
)

export default http