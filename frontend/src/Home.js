import { useState, useEffect } from 'react'
import './Home.css'
import Counter from './components/Counter'
import ItemList from './components/ItemList'

function Home() {
    const [items, setItems] = useState([])
    const [newProductName, setNewProductName] = useState('')
    const [counter, setCounter] = useState(0)

    useEffect(() => {
        fetch('http://127.0.0.1:5050/api/items', { method: 'GET' })
            .then((response) => {
                response.json().then((result) => {
                    setItems(result.data)
                })
            })
            .catch(error => console.error(error.message))
    }, [])

    function handleSubmit(event) {
        event.preventDefault()
        fetch('http://127.0.0.1:5050/api/add', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: newProductName, number: counter })
        })
            .then(response => response.json()
                .then((result) => {
                    setCounter(0)
                    if (result.code == '200') {
                        alert(result.success.message)
                    } else {
                        alert(result.errors.message)
                    }
                }))
            .catch(error => alert(error.message))
    }

    function handleDelete() {

    }

    return (
        <div className='container d-flex flex-column gap-4'>
            <h3>List of Item in Inventory</h3>
            <div id='alert'></div>
            <div className='form-container d-flex align-items-start gap-3'>
                <form method='POST' onSubmit={handleSubmit}>
                    <input name='name' type='text' className='form-control' placeholder='Item Name' autoComplete='off'
                        onChange={e => setNewProductName(e.target.value)} required />
                    <input name='number' type='number' value={counter} required readOnly hidden ></input>
                    <button type='submit' className='btn btn-primary d-flex'>
                        <i className='bi bi-plus'></i>
                        Add
                    </button>
                </form>
                <Counter counter={counter} setCounter={setCounter} ></Counter>
            </div>

            <div className='table-container'>
                <ItemList items={items} handleDelete={handleDelete}></ItemList>
            </div>
        </div>
    )
}

export default Home