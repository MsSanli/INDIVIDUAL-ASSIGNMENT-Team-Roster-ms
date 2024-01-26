import React from 'react';
import PropTypes from 'prop-types';
import { Card, Button } from 'react-bootstrap';
import Link from 'next/link';
import { deleteSingleMember } from '../api/memberData';

function MembCard({ memberObj, onUpdate }) {
  // FOR DELETE, WE NEED TO REMOVE THE AUTHOR AND HAVE THE VIEW RERENDER,
  // SO WE PASS THE FUNCTION FROM THE PARENT THAT GETS THE MEMBER
  const deleteThisMemb = () => {
    if (window.confirm(`Delete ${memberObj.name}?`)) {
      deleteSingleMember(memberObj.firebaseKey).then(() => onUpdate());
    }
  };

  return (
    <div>
      <Card style={{ width: '18rem', margin: '10px' }}>
        <Card.Img variant="top" src={memberObj.image} alt={memberObj.name} style={{ height: '350px' }} />
        <Card.Body>
          <Card.Title>{memberObj.name}</Card.Title>
          <p>{memberObj.role}</p>
          <Link href={`/member/edit/${memberObj.firebaseKey}`} passHref>
            <Button variant="info">EDIT</Button>
          </Link>
          <Button variant="danger" onClick={deleteThisMemb} className="m-2">
            DELETE
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
}

MembCard.propTypes = {
  memberObj: PropTypes.shape({
    firebaseKey: PropTypes.string,
    image: PropTypes.string,
    name: PropTypes.string,
    role: PropTypes.string,
    uid: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default MembCard;
