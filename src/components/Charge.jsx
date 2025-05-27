export const Charge = ({ charge }) => {

    return (
        <div
            className={`absolute top-5 bg-slate-100 font-semibold text-slate-600 opacity-50 h-1/3 w-1/2 flex flex-col 
                justify-center items-center rounded-lg z-40 hover:opacity-100 ${charge === 100 ? 'hidden' : ''}`}
        >
            <h3>Decodificando documento, espere un momento...</h3>
            <div className="w-2/3 justify-start items-start">
                <div
                    style={{ width: `${charge}%` }}
                    className={`h-2 bg-red-500 rounded-lg transition-all duration-500`}
                />
            </div>
        </div>
    )
}