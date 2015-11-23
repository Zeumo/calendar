var Calendar=function(e){function t(a){if(n[a])return n[a].exports;var r=n[a]={exports:{},id:a,loaded:!1};return e[a].call(r.exports,r,r.exports,t),r.loaded=!0,r.exports}var n={};return t.m=e,t.c=n,t.p="",t(0)}([function(e,t,n){var a=n(1),r=n(8),i=n(9),s=function(e,t){this.el=e,this.options=a.extend({onDayClick:a.noop},t),this.currentDate=new Date,this.calendarEvents={},r._delegate.call(this)};a.extend(s.prototype,r,{render:i}),e.exports=s},function(e,t){e.exports=_},function(e,t,n){var a=n(1),r=["January","February","March","April","May","June","July","August","September","October","November","December"];e.exports={beginningOfMonth:function(e){return new Date(e.getFullYear(),e.getMonth(),1)},endOfMonth:function(e){return new Date(e.getFullYear(),e.getMonth()+1,0)},daysInMonth:function(e){return new Date(e.getYear(),e.getMonth()+1,0).getDate()},getMonthName:function(e){return r[e.getMonth()]},simpleTime:function(e){var t=[],n=e.getHours(),a=e.getMinutes();a=a&&10>a?"0"+a:a;var r=12>n?"a":"p";return n=n>12?n-12:0===n?12:n,t.push(n),a&&t.push(":"+a),t.push(r),t.join("")},isBetween:function(e,t,n){return e=a.clone(e).setHours(0,0,0,0),t=a.clone(t).setHours(0,0,0,0),n=a.clone(n).setHours(0,0,0,0),e>=t&&n>=e},isSameDay:function(e,t){return e=a.clone(e),t=a.clone(t),e.setHours(0,0,0,0),t.setHours(0,0,0,0),e.getTime()===t.getTime()},isToday:function(e){return this.isSameDay(new Date,e)},nextMonthDate:function(e){var t,n=e.getMonth();return t=11===n?new Date(e.getFullYear()+1,0,1):new Date(e.getFullYear(),n+1,1)},prevMonthDate:function(e){var t,n=e.getMonth();return t=0===n?new Date(e.getFullYear()-1,11,1):new Date(e.getFullYear(),n-1,1)},buildWeeks:function(e){var t=this.daysInMonth(e),n=this.beginningOfMonth(e).getDay(),r=a(t).times().map(function(e){return e+1}).value();return a.times(n,function(){r.unshift("")}),a.chunk(r,7)}}},function(e,t){e.exports='<div id="zeumo-calender"><div class="header"><span class="title"><%= monthName %> <%= year %></span><div class="actions"><a href="#" class="today">Today</a><a href="#" class="prev">&larr;</a><a href="#" class="next">&rarr;</a></div></div><table><thead><%= header %></thead><tbody><%= weeks %></tbody></table></div>'},function(e,t){e.exports='<td class="<%= active %>"><% if (day) { %><div class="day" data-date="<%= date %>"><span class="numeral"><%= day %></span><div class="day-events"><%= events %></div></div><% } %></td>'},function(e,t){e.exports='<div class="event"><% if (url) { %><a href="<%= url %>" class="event-title"><% if (date.isSameDay(today, start_date)) { %><%= date.simpleTime(start_date) %>&nbsp;<% } %><%= title %></a><% } else { %><span class="event-title"><% if (date.isSameDay(today, start_date)) { %><%= date.simpleTime(start_date) %>&nbsp;<% } %><%= title %></span><% } %></div>'},function(e,t,n){var a=n(1),r=n(2),i=n(7),s=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],o={},u=function(e){var t=a.filter(o.events,function(t){return r.isBetween(e,t.start_date,t.end_date)?t:void 0},[]);return a.sortBy(t,"start_date")};e.exports={dayNames:function(){return i.tr(s.map(i.th).join(""))},events:function(e){var t=a.template(n(5),{imports:{date:r,today:e}});return a.map(u(e),t).join("")},day:function(e){var t=a.template(n(4)),i=e&&"number"==typeof e,s=new Date(o.date);return s.setDate(e),t({day:e,date:s,active:i&&r.isToday(s)?"active":"",events:this.events(s)})},week:function(e){return i.tr(a.map(e,this.day,this).join(""))},month:function(e){return a.map(e,this.week,this).join("")},template:function(e){o=e;var t=a.template(n(3));return t({monthName:r.getMonthName(o.date),year:o.date.getFullYear(),header:this.dayNames(),weeks:this.month(r.buildWeeks(o.date))})}}},function(e,t){var n=function(e){return function(t){return"<"+e+">"+t+"</"+e+">"}};e.exports={th:n("th"),tr:n("tr")}},function(e,t,n){var a=n(1),r=n(10),i=n(2);e.exports={events:{"click .next":"handleNextMonth","click .prev":"handlePrevMonth","click .today":"handleToday","click .day":"handleDay"},_delegate:function(){a.each(this.events,function(e,t){var n=t.split(" "),a=n[1],i=n[0];r(this.el).on(i,a,this[e].bind(this))},this)},handleNextMonth:function(e){e.preventDefault();var t=i.nextMonthDate(this.currentDate);this.render(t)},handlePrevMonth:function(e){e.preventDefault();var t=i.prevMonthDate(this.currentDate);this.render(t)},handleToday:function(e){e.preventDefault(),this.render(new Date)},handleDay:function(e){this.options.onDayClick(new Date(r(e.currentTarget).data("date")))}}},function(e,t,n){var a=n(6),r=function(e){return _.map(e,function(e){return e.start_date instanceof Date?e:_.merge(e,{start_date:new Date(e.start_date),end_date:new Date(e.end_date)})})};e.exports=function(e,t){this.currentDate=e||this.currentDate,this.calendarEvents=r(t||this.calendarEvents),this.el.innerHTML=a.template({date:this.currentDate,events:this.calendarEvents})}},function(e,t){e.exports=$}]);