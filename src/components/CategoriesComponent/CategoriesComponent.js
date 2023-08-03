
import {Dropdown} from "react-bootstrap";



const CategoriesComponent = ({arrayOfCategories,filter}) => {


    return (
        <div>


            <Dropdown>
                <Dropdown.Toggle style={{backgroundColor:"cornflowerblue"}} id="dropdown-basic">
                    Categories
                </Dropdown.Toggle>


                <Dropdown.Menu>
                    {arrayOfCategories.map(cat=><Dropdown.Item href="#/action" key={Math.random()} onClick={()=>filter(cat)} >{cat}</Dropdown.Item>)}
                </Dropdown.Menu>
            </Dropdown>

        </div>
    );
};

export {CategoriesComponent};