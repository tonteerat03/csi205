import { Form, Table, Badge, Button, Modal } from "react-bootstrap"

import { useEffect, useState, useRef } from "react"
import { fetchTodos } from "../data/todos"

const Todos = () => {

    const newIdRef = useRef()
    const newTitleRef = useRef()

    // todosRaw -> filters -> todos

    const [todosRaw, setTodosRaw] = useState([])
    const [todos, setTodos] = useState([])
    const [onlyWaiting, setOnlyWaiting] = useState(false)
    const [itemsPerPage, setItemsPerPage] = useState(5)
    const [numPages, setNumPages] = useState(3)
    const [currentPage, setCurrentPage] = useState(1)

    useEffect(() => {
        setTodosRaw(fetchTodos())
    }, [])

    useEffect(() => {

        setTodos(todosRaw)
    }, [todosRaw])

    useEffect(() => {

        let filtered = onlyWaiting
            ? todosRaw.filter((t) => !t.completed)
            : todosRaw;

        const totalPages = Math.ceil(filtered.length / itemsPerPage);
        setNumPages(totalPages);

        // รายการที่จะแสดง
        const start = (currentPage - 1) * itemsPerPage;
        const end = start + Number(itemsPerPage);
        const paginated = filtered.slice(start, end);

        setTodos(paginated);
    }, [todosRaw, onlyWaiting, itemsPerPage, currentPage]);

    // event handlers
    const deleteClick = (id) => {
        setTodosRaw(todosRaw.filter((todo) => todo.id !== id))
    };

    const waitingClick = (id) => {
        const updated = todosRaw.map((todo) => {
            if (todo.id === id) {
                return { ...todo, completed: true };
            }
            return todo;
        });
        setTodosRaw(updated);
    };

    //handle modal

    const [show, setShow] = useState(true);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const saveClick = (id, title) => {
        console.log(id, title);
        if (title.trim() !== '') {
            const newTodo =
                setTodosRaw([
                    ...todosRaw,
                    {
                        userId: 1,
                        id: Number(id),
                        title,
                        completed: false
                    }
                ]);
        }
        newIdRef.current.value = '';
        newTitleRef.current.value = '';

        handleClose();
    };

    return (
        <>
            {/* modal */}
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>ID:</Form.Label>
                            <Form.Control
                                value={todosRaw.reduce((prev, todo) => todo.id > prev ? todo.id : prev
                                    , -1) + 1}
                                autoFocus
                                disabled={true}
                                ref={newIdRef}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Title:</Form.Label>
                            <Form.Control
                                placeholder="new todo here"
                                autoFocus ref={newTitleRef}
                            />
                        </Form.Group>

                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => saveClick(Number(newIdRef.current.value), newTitleRef.current.value)}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>

            <div className="container py-4">
                {/* filters */}
                <Form>
                    <div className="d-flex justify-content-between align-items-center p-3">
                        <div className="d-flex align-items-center gap-2">
                            <Form.Check
                                type="switch"
                                id="custom-switch"
                                // label="Show only waiting"
                                onChange={(e) => setOnlyWaiting(e.target.checked)}
                            />
                            <span>Show only&nbsp;<Button variant="warning">Waiting&nbsp;<i class="bi bi-clock"></i></Button></span>
                        </div>

                        <Form.Select
                            aria-label="Items per page"
                            className="w-25"
                            onChange={(e) => setItemsPerPage(e.target.value)}
                        >
                            <option value={5}>5 items per page</option>
                            <option value={10}>10 items per page</option>
                            <option value={50}>50 items per page</option>
                            <option value={100}>100 items per page</option>
                        </Form.Select>
                    </div>
                </Form>

                {/* table */}
                <div>
                    <Table striped bordered hover>
                        <thead className='table-dark'>
                            <tr>
                                <th className="text-center" style={{ width: '3rem' }}>ID</th>
                                <th className="text-center">Title</th>
                                <th className="text-end" style={{ width: '12rem' }}>
                                    <span className="me-2">Completed</span>
                                    <Button variant="primary" size="sm" className="d-inline-flex align-items-center justify-content-center" title="Add completed" onClick={() => handleShow()}   >
                                        <i className="bi bi-plus" />
                                    </Button>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {/*}
        <tr>
          <td>1</td>
          <td>Mark</td>
          <td>Otto</td>
        </tr> 
*/}
                            {todos.map((todo) => {
                                return (
                                    <tr>
                                        <td className="text-center">
                                            <h5><Badge bg="secondary">{todo.id}</Badge></h5>
                                        </td>
                                        <td>{todo.title}</td>
                                        <td className="text-end">
                                            {todo.completed ? (
                                                <Badge bg='success' className="fs-6">done&nbsp;<i class="bi bi-check2"></i></Badge>
                                            ) : (
                                                <Button variant='warning' onClick={() => {
                                                    waitingClick(todo.id)
                                                }}>Waiting&nbsp;<i class="bi bi-plus"></i>
                                                </Button>
                                            )}
                                            &nbsp;
                                            <Button variant='danger' onClick={() => {
                                                deleteClick(todo.id)
                                            }}>
                                                <i class="bi bi-trash"></i>
                                            </Button>
                                        </td>

                                    </tr>
                                )
                            })}
                        </tbody>
                    </Table>
                </div>
            </div>

            {/* page control */}
            <div className="text-center">
                <Button
                    variant="outline-primary"
                    onClick={() => setCurrentPage(1)} disabled={currentPage === 1}
                >
                    First
                </Button>&nbsp;

                <Button
                    variant="outline-primary"
                    onClick={() => {
                        if (currentPage > 1) {
                            setCurrentPage((p) => p - 1);
                        }
                    }}
                    disabled={currentPage === 1}
                >
                    Previous
                </Button>&nbsp;

                <span>{currentPage} / {numPages}</span>&nbsp;

                <Button
                    variant="outline-primary"
                    onClick={() => {
                        if (currentPage < numPages) {
                            setCurrentPage((p) => p + 1);
                        }
                    }}
                    disabled={currentPage === numPages}
                >
                    Next
                </Button>&nbsp;

                <Button
                    variant="outline-primary"
                    onClick={() => setCurrentPage(numPages)}
                    disabled={currentPage === numPages}
                >
                    Last
                </Button>&nbsp;
            </div>
        </>
    )
}

export default Todos;