module.exports = (app)=>{
  var Resource = require('./Resource')();
  var PromisePipe = app.actions.PromisePipe;

  PromisePipe.use('get', Resource.get);
  PromisePipe.use('del', Resource.del);
  PromisePipe.use('post', Resource.post);
  PromisePipe.use('put', Resource.put)

  PromisePipe.use('log', function emit(data, context, logname){
    console.log(logname,">",data, context);
    return data;
  });

  PromisePipe.use('redirect', function emit(data, context, routeName){
    context.app.transitionTo(routeName);
    return data;
  });

  PromisePipe.use('emit', function emit(data, context, eventName, emitData){
    context.emit(eventName, emitData || data);
    return data;
  });
  PromisePipe.use('catchEmit', function emit(data, context, eventName){
    context.emit(eventName, data);
    return data;
  }, {isCatch:true});
}
