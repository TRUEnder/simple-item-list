export default function ItemList({ items, handleDelete }) {
    if (items.length === 0) {
        return (
            <div id='no-item'>
                No items found
            </div>
        )
    } else {
        return (
            <table className='table table-bordered rounded'>
                <thead className='table-primary'>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Product Name</th>
                        <th scope="col">Number of Item</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((item) =>
                        <tr key={item.name}>
                            <th>1</th>
                            <td>{item.name}</td>
                            <td>{item.number}</td>
                            <td className="d-flex justify-content-center gap-2">
                                <button id='edit' className="action-button btn btn-warning">
                                    <i className="bi bi-pencil-square"></i>
                                    Edit
                                </button>
                                <button id='delete' className="action-button btn btn-danger" onClick={handleDelete}>
                                    <i className="bi bi-trash"></i>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        )
    }
}