import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export default function CategoryForm(props) {
    
    return (
        <Form onSubmit={(e) => {e.preventDefault(); e.stopPropagation()}}>

            <Form.Group className="mb-3 w-50" controlId="formBasicEmail">
                <Form.Label>New Category's Name</Form.Label>
                <div className='d-flex'>
                <Form.Control type="text" placeholder="Name" onChange={(e) => {props.handleAction.setNewCategoryName(e.target.value)}} />
                <Button variant="warning" type="submit" className=' mx-2 w-25 rounded text-white' onClick={props.handleAction.handleCreate}>
                    Add
                </Button>
                </div>
            </Form.Group>

           
            
        </Form>
    );
}

