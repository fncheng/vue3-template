import request, { axiosRequestWithAbort } from './index'

export const getNumber = (params: any) =>
    request<any, { number: number }>({
        url: '/test/getNumber',
        method: 'get',
        params
    })

export const getNumberAbort = () =>
    axiosRequestWithAbort<{ number: number }>({
        url: '/test/getNumber',
        method: 'get'
    })

export const getName = () =>
    request<any, string>({
        url: '/test/getName',
        method: 'get'
    })

export const getId = (id: number) =>
    request({
        url: `/test/user`,
        method: 'get',
        params: {
            id
        }
    })

export const getRequest = (controller: AbortController) =>
    request({
        url: 'http://127.0.0.1:3000/route',
        method: 'get',
        signal: controller.signal
    })

export const getEvents = () =>
    request<any, string>({
        url: 'http://127.0.0.1:3000/events',
        method: 'get'
    })

export const postUploadFile = (data: any) =>
    request({
        url: 'http://127.0.0.1:3000/test/upload',
        method: 'post',
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        data
    })

export const mergeFileChunk = (data: any) =>
    request({
        url: 'http://127.0.0.1:3000/upload/merge',
        method: 'post',
        data
    })
export const checkFileChunk = (data: { fileHash: string }) =>
    request<any, number[]>({
        url: 'http://127.0.0.1:3000/upload/check',
        method: 'get',
        params: data
    })

export const getContent = () =>
    request<any, { transcriptResult: string }>({
        url: 'http://127.0.0.1:3000/test/getContent',
        method: 'get'
    })

export const getNodes = (node?: string | number) =>
    request<any, { nodes: any[] }>({
        url: '/getNodes',
        method: 'get',
        params: { node }
    })
