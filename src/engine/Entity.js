import styled from "styled-components";

const GridItem = styled.div`
  background-color: red;
  /* border: black solid 1px; */
  position: absolute;
  left: ${(props) => props.posx}px;
  top: ${(props) => props.posy}px;
  height: 64px;
  width: 64px;
`;

function Entity(props) {
  return (
    <GridItem posx={props.posx} posy={props.posy}>
      {props.children}
    </GridItem>
  );
}

export default Entity;
