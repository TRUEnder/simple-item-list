export default function Counter({ counter, setCounter }) {
    return (
        <div className='counter-container d-flex align-items-center'>
            <button id='dec'
                onClick={() => setCounter(counter => counter - 1)}
                className='btn btn-info'>
                <i className='bi bi-dash'></i>
            </button>
            <div id='counter'>{counter}</div>
            <button id='inc'
                onClick={() => setCounter(counter => counter + 1)}
                className='btn btn-info'>
                <i className='bi bi-plus'></i>
            </button>
        </div>
    )
}