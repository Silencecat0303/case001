function getID(id){
    return document.getElementById(id);
}
class FormInput extends React.Component {
    constructor(props) {
        super(props);
    
        this.state = { isOpen: false ,isNeed:false,value:""};
        this.timeOutId = null;
    
        this.onBlurHandler = this.onBlurHandler.bind(this);
        this.onFocusHandler = this.onFocusHandler.bind(this);
    }
    onBlurHandler(e) {
        // const need=this.props.isNeed;
        // const need=true;
        // const value=e.target.value;
        console.log("onBlurHandler  "+this.props.isNeed);
        this.setState({
            isOpen: false,
            isNeed:this.props.isNeed,
            value:e.target.value
        });
        console.log(this.state.isNeed);
    }
    onFocusHandler() {
        this.setState({
            isOpen: true
        });
    }
    render() {
        let myclass="";
        if(this.state.isOpen){
            myclass="mb-5 border_left py-2";
        }else{
            myclass=(this.state.isNeed&&this.state.value==="")?"mb-5 border_left_r py-2":"mb-5 border_left_o py-2";
        }
        return (
            <div className={myclass}>
                <div onBlur={this.onBlurHandler} onFocus={this.onFocusHandler}>
                    <h5>
                        {this.props.ask}
                        {(this.state.isNeed&&this.state.value==="") && 
                            <span className="warning">
                                <img src="../css/notifications.png" className="icon" />
                                &nbsp;這是必填項目
                            </span>
                        }
                    </h5>
                    {this.props.elem==="input"&&<input type={this.props.type} name={this.props.name} className="form_input" placeholder={this.props.placeholder}/>}
                    {this.props.elem==="textarea"&&<textarea name="cothis.props.namentent" className="form_textarea"></textarea>}
                    {this.props.elem==="radio" &&
                        this.props.array.map(ary=>
                            <div key={ary.id}>
                                <input type="radio" name={ary.name} id={ary.id} className="mr-3 form_radio" />
                                <label htmlFor={ary.id}>{ary.value}</label><br />
                                {ary.input!==null&&<input type="text" name="ary.input" className="form_input" />}
                            </div>
                        )
                    }
                </div>
            </div>
        );
    }
}
class OuterClickExample extends React.Component {
    constructor(props) {
        super(props);
        this.state = { isOpen: false ,word:"請選擇",value:""};
        this.toggleContainer = React.createRef();
        this.onClickHandler = this.onClickHandler.bind(this);
        this.onClickOutsideHandler = this.onClickOutsideHandler.bind(this);
        this.selectchange=this.selectchange.bind(this);
    }
    componentDidMount() {
        window.addEventListener('click', this.onClickOutsideHandler);
    }
    componentWillUnmount() {
        window.removeEventListener('click', this.onClickOutsideHandler);
    }
    onClickHandler() {
        this.setState(currentState => ({
            isOpen: !currentState.isOpen
        }));
    }
    onClickOutsideHandler(event) {
        if (this.state.isOpen && !this.toggleContainer.current.contains(event.target)) {
            this.setState({ isOpen: false });
        }
    }
    selectchange(e){
        this.setState({word:e.target.innerHTML,value:e.target.value,isOpen: false});
    }
    render() {
        return (
            <div ref={this.toggleContainer} className={this.state.isOpen?"mb-5 border_left py-2":"mb-5 border_left_o py-2"} >
                <h5>{this.props.title}</h5>
                <div  className="pretty-select dv1" onClick={this.onClickHandler}>{this.state.word}</div>
                <input type="hidden" name="select" value={this.state.value} />
                {this.state.isOpen && (
                    <ul className="option" onClick={this.selectchange}>
                        {this.props.option.map(op=>
                            <li value={op.value} key={op.value}>{op.html}</li>
                        )}
                    </ul>
                )}
            </div>
        );
    }
}

                        