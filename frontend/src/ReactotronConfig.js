import Reactotron from "reactotron-react-js";
import { reactotronRedux } from "reactotron-redux";

Reactotron.configure({ name : 'bluecots_ico'})
.use(reactotronRedux())
.connect();

export default Reactotron;