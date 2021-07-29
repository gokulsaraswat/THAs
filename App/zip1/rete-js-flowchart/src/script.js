var actionSocket = new Rete.Socket('Action');
var dataSocket = new Rete.Socket('Data');

var eventHandlers = {
    list: [],
    remove() {
        this
            .list
            .forEach(h => {
                document.removeEventListener('keydown', h);
            });
        this.list = [];
    },
    add(name, h) {
        document.addEventListener(name, h, false);
        this
            .list
            .push(h);
    }
};



class MessageControl extends Rete.Control {

    constructor(emitter, msg) {
        super();
        this.emitter = emitter;
        this.template = '<input :value="msg" @input="change($event)"/>';

        this.scope = {
            msg,
            change: this.change.bind(this)
        };
    }

    change(e) {
        this.scope.value = +e.target.value;
        this.update();
    }

    update() {
        this.putData('msg', this.scope.value)
        this.emitter.trigger('process');
        this._alight.scan();
    }

    mounted() {
        this.scope.value = this.getData('msg') || 0;
        this.update();
    }

    setValue(val) {
        this.scope.value = val;
        this._alight.scan()
    }
}

class KeydownComponent extends Rete.Component {
  
  constructor(){
    super('Keydown event');
    this.task = {
      outputs: {act: 'option', key: 'output'},
      init(task){
        eventHandlers.remove();
        eventHandlers.add('keydown', function (e) {
          task.run(e.keyCode);
          task.reset();
        });
      }
    }
  }
  
  builder(node) {
    node.addOutput(new Rete.Output('act', '', actionSocket))
    node.addOutput(new Rete.Output('key', 'Key code', dataSocket));
  }
  
  worker(node, inputs, data) {
    console.log('Keydown event', node.id, data);
    return {key: data}
  }
}

class EnterPressComponent extends Rete.Component {
  
  constructor(){
    super('Enter pressed');
    this.task = {
      outputs: {then:'option', else:'option'}
    }
  }
  
  builder(node) {

    node
      .addInput(new Rete.Input('act','', actionSocket))
      .addInput(new Rete.Input('key', 'Key code', dataSocket))
      .addOutput(new Rete.Output('then', 'Then', actionSocket))
      .addOutput(new Rete.Output('else', 'Else', actionSocket));
  }

  worker(node, inputs, outputs) {
    if (inputs['key'][0] == 13) 
      this.closed = ['else'];
    else 
      this.closed = ['then'];

    console.log('Print', node.id, inputs);
  }
}

class AlertComponent extends Rete.Component {
  
  constructor() {
    super('Alert');
    this.task = {
      outputs: {}
    }
  }

  builder(node) {
    var ctrl = new MessageControl(this.editor, node.data.msg);
    
    node
      .addControl(ctrl)
      .addInput(new Rete.Input('act', '', actionSocket));
  }

  worker(node, inputs) {
    console.log('Alert', node.id, node.data);
    alert(node.data.msg);
 }
}

var components = [new KeydownComponent, new EnterPressComponent, new AlertComponent];
var container = document.querySelector('#rete')


var editor = new Rete.NodeEditor('tasksample@0.1.0', container,);
editor.use(AlightRenderPlugin);
editor.use(ConnectionPlugin);
editor.use(ContextMenuPlugin);
editor.use(TaskPlugin);

var engine = new Rete.Engine('tasksample@0.1.0');

components.map(c => {
  editor.register(c);
  engine.register(c);
});

editor.on('connectioncreate connectionremove nodecreate noderemove', ()=>{
  if(editor.silent) return;
     
  compile();
});




async function compile() {
    await engine.abort();
    await engine.process(editor.toJSON());
}



var data = {
    'id': 'tasksample@0.1.0',
    'nodes': {
        '2': {
            'id': 2,
            'data': {},
            'group': null,
            'inputs': {},
            'outputs': {
                'act': {
                    'connections': [
                        {
                            'node': 3,
                            'input': 'act'
                        }
                    ]
                },
                'key': {
                    'connections': [
                        {
                            'node': 3,
                            'input': 'key'
                        }
                    ]
                }
            },
            'position': [
                114, 133
            ],
            'name': 'Keydown event'
        },
        '3': {
            'id': 3,
            'data': {},
            'group': null,
            'inputs': {
                'act':{
                    'connections': [
                        {
                            'node': 2,
                            'output': 'act'
                        }
                    ]
                }, 
                'key': {
                    'connections': [
                        {
                            'node': 2,
                            'output': 'key'
                        }
                    ]
                }
            },
            'outputs': {
                'then':{
                    'connections': [
                        {
                            'node': 10,
                            'input': 'act'
                        }
                    ]
                }, 
                'else': {
                    'connections': [
                        {
                            'node': 11,
                            'input': 'act'
                        }
                    ]
                }
            },
            'position': [
                443, 112
            ],
            'name': 'Enter pressed'
        },
        '10': {
            'id': 10,
            'data': {
                'msg': 'Enter!'
            },
            'group': null,
            'inputs': {
                'act': {
                    'connections': [
                        {
                            'node': 3,
                            'output': 'then'
                        }
                    ]
                }
            },
            'outputs': [],
            'position': [
                773, 106
            ],
            'name': 'Alert'
        },
        '11': {
            'id': 11,
            'data': {
                'msg': 'Another key pressed'
            },
            'group': null,
            'inputs': {
                'act': {
                    'connections': [
                        {
                            'node': 3,
                            'output': 'else'
                        }
                    ]
                }
            },
            'outputs': [],
            'position': [
                766, 292
            ],
            'name': 'Alert'
        }
    },
    'groups': {}
}

editor.fromJSON(data).then(() => {
    editor.view.resize();
    compile();
});
