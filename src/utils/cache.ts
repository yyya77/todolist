// 存储数据
const localSave = (key: string, value: any) => {
    const data = JSON.stringify(value)
    localStorage.setItem(key, data)
}

// 获取数据
const localGet = (key: string) => {
    const value = localStorage.getItem(key)
    if (value) {
        return JSON.parse(value)
    }
}

export { localSave, localGet }
