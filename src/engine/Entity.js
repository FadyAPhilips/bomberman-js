import styled from "styled-components";

const GridItem = styled.div`
  background-color: red;
  border: black solid 1px;
  grid-column: ${(props) => props.posx};
  grid-row: ${(props) => props.posy};
`;

function Entity(props) {
  return (
    <GridItem posx={props.posx} posy={props.posy}>
      {props.children}
    </GridItem>
  );
}

export default Entity;
