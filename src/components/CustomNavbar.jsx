import {Button, Container, Form, FormControl, Nav, Navbar} from "react-bootstrap";
import {useState} from "react";
import axios from "axios";

const CustomNavbar = ({setSearchResults, url}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState(null)

  const handleSearch = async (e) => {
    e.preventDefault()
    if (searchQuery.trim() !== '') {
      console.log('Searching...')
      try {
        const response = await axios.get(url, {
          params: {
            query: searchQuery
          }
        });
        setSearchResults(response.data);
      } catch (err) {
        setError(err);
      }
    }
  }

  const handleHomeClick = () => {
    setSearchQuery('')
  }

  return (
      <Navbar expand="lg" className="bg-body-tertiary sticky-top">
        <Container>
          <Navbar.Brand href="#home">Melissa's Movie Database</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav"/>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link onClick={handleHomeClick} href="/">Home</Nav.Link>
              <Nav.Link href="#link">Link</Nav.Link>
            </Nav>
            <Form className="d-flex" onSubmit={handleSearch}>
              <FormControl
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button variant="outline-success" type="submit">Search</Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
  )
}

export default CustomNavbar;