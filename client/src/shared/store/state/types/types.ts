// Общий интерфейс состояния redux slice
export interface ICommonState {
    loading: boolean, // индикатор загрузки
    error: string | null, // сообщение об ошибке (при возникновении)
}