import PropTypes from 'prop-types';
import { Button, ButtonGroup, Dropdown } from "react-bootstrap";

const SortDropdown = ({ filterType, setFilterType }) => {
    return (
        <Dropdown as={ButtonGroup}>
            <Button variant="secondary">{filterType === 'ascending' ? 'A-Z' : 'Z-A'}</Button>
            <Dropdown.Toggle>
                <Dropdown.Item onClick={() => setFilterType('ascending')}>Sort A-Z</Dropdown.Item>
                <Dropdown.Item onClick={() => setFilterType('descending')}>Sort Z-A</Dropdown.Item>
            </Dropdown.Toggle>
        </Dropdown>
    );
};

SortDropdown.propTypes = {
    filterType: PropTypes.oneOf(['ascending', 'descending']).isRequired,
    setFilterType: PropTypes.func.isRequired
};

export default SortDropdown;
