/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2016 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','sap/ui/core/Control','sap/ui/core/LocaleData','sap/ui/model/type/Date','sap/ui/unified/calendar/CalendarUtils','./calendar/Header','./calendar/MonthsRow','./calendar/MonthPicker','./calendar/YearPicker','sap/ui/core/date/UniversalDate','./library'],function(q,C,L,D,a,H,M,b,Y,U,l){"use strict";var c=C.extend("sap.ui.unified.CalendarMonthInterval",{metadata:{library:"sap.ui.unified",properties:{width:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:null},startDate:{type:"object",group:"Data"},intervalSelection:{type:"boolean",group:"Behavior",defaultValue:false},singleSelection:{type:"boolean",group:"Behavior",defaultValue:true},months:{type:"int",group:"Appearance",defaultValue:12},pickerPopup:{type:"boolean",group:"Appearance",defaultValue:false},minDate:{type:"object",group:"Misc",defaultValue:null},maxDate:{type:"object",group:"Misc",defaultValue:null}},aggregations:{selectedDates:{type:"sap.ui.unified.DateRange",multiple:true,singularName:"selectedDate"},specialDates:{type:"sap.ui.unified.DateTypeRange",multiple:true,singularName:"specialDate"},header:{type:"sap.ui.unified.calendar.Header",multiple:false,visibility:"hidden"},monthsRow:{type:"sap.ui.unified.calendar.MonthsRow",multiple:false,visibility:"hidden"},yearPicker:{type:"sap.ui.unified.calendar.YearPicker",multiple:false,visibility:"hidden"}},associations:{ariaLabelledBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaLabelledBy"},legend:{type:"sap.ui.unified.CalendarLegend",multiple:false}},events:{select:{},cancel:{},startDateChange:{}}}});c.prototype.init=function(){this._iMode=0;this.data("sap-ui-fastnavgroup","true",true);this._oYearFormat=sap.ui.core.format.DateFormat.getDateInstance({format:"y"});this._oMinDate=new U(new Date(Date.UTC(1,0,1)));this._oMinDate.getJSDate().setUTCFullYear(1);this._oMaxDate=new U(new Date(Date.UTC(9999,11,31)));var z=new H(this.getId()+"--Head",{visibleButton0:false,visibleButton1:false,visibleButton2:true});z.attachEvent("pressPrevious",this._handlePrevious,this);z.attachEvent("pressNext",this._handleNext,this);z.attachEvent("pressButton2",p,this);this.setAggregation("header",z);var A=new M(this.getId()+"--MonthsRow");A.attachEvent("focus",s,this);A.attachEvent("select",r,this);A._bNoThemeChange=true;this.setAggregation("monthsRow",A);var B=new Y(this.getId()+"--YP",{columns:0,years:6});B.attachEvent("select",t,this);B.attachEvent("pageChange",y,this);this.setAggregation("yearPicker",B);this._iDaysMonthsHead=15;};c.prototype.exit=function(){if(this._sInvalidateContent){q.sap.clearDelayedCall(this._sInvalidateContent);}};c.prototype.onBeforeRendering=function(){var z=this.getAggregation("monthsRow");var A=this._getFocusedDate();i.call(this);z.setDate(a._createLocalDate(A));};c.prototype.setStartDate=function(S){if(!(S instanceof Date)){throw new Error("Date must be a JavaScript date object; "+this);}if(q.sap.equal(this.getStartDate(),S)){return this;}var z=S.getFullYear();if(z<1||z>9999){throw new Error("Date must not be in valid range (between 0001-01-01 and 9999-12-31); "+this);}var A=a._createUniversalUTCDate(S);this.setProperty("startDate",S,true);this._oUTCStartDate=A;this._oUTCStartDate.setUTCDate(1);var B=this.getAggregation("monthsRow");B.setStartDate(S);i.call(this);var E=a._createLocalDate(this._getFocusedDate());if(!B.checkDateFocusable(E)){this._setFocusedDate(this._oUTCStartDate);B.displayDate(S);}return this;};c.prototype.invalidate=function(O){if(!this._bDateRangeChanged&&(!O||!(O instanceof sap.ui.unified.DateRange))){C.prototype.invalidate.apply(this,arguments);}else if(this.getDomRef()&&this._iMode==0&&!this._sInvalidateContent){this._sInvalidateContent=q.sap.delayedCall(0,this,u);}};c.prototype.removeAllSelectedDates=function(){this._bDateRangeChanged=true;var R=this.removeAllAggregation("selectedDates");return R;};c.prototype.destroySelectedDates=function(){this._bDateRangeChanged=true;var z=this.destroyAggregation("selectedDates");return z;};c.prototype.removeAllSpecialDates=function(){this._bDateRangeChanged=true;var R=this.removeAllAggregation("specialDates");return R;};c.prototype.destroySpecialDates=function(){this._bDateRangeChanged=true;var z=this.destroyAggregation("specialDates");return z;};c.prototype.setLocale=function(z){if(this._sLocale!=z){this._sLocale=z;this._oLocaleData=undefined;this.invalidate();}return this;};c.prototype.getLocale=function(){if(!this._sLocale){this._sLocale=sap.ui.getCore().getConfiguration().getFormatSettings().getFormatLocale().toString();}return this._sLocale;};c.prototype._getFocusedDate=function(){if(!this._oFocusedDate){f.call(this);}return this._oFocusedDate;};c.prototype._setFocusedDate=function(z){if(!(z instanceof U)){throw new Error("Date must be a UniversalDate object "+this);}this._oFocusedDate=new U(z.getTime());};c.prototype.focusDate=function(z){var F=false;var A=this.getAggregation("monthsRow");if(!A.checkDateFocusable(z)){var B=a._createUniversalUTCDate(z);v.call(this,B);F=true;}o.call(this,z,false);if(F){this.fireStartDateChange();}return this;};c.prototype.displayDate=function(z){o.call(this,z,true);return this;};c.prototype.setMonths=function(z){this.setProperty("months",z,true);z=this._getMonths();var A=this.getAggregation("monthsRow");A.setMonths(z);var B=a._createLocalDate(this._getFocusedDate());if(!A.checkDateFocusable(B)){var S=d.call(this);this._setFocusedDate(this._oUTCStartDate);A.setDate(a._createLocalDate(S));}if(!this.getPickerPopup()){var E=this.getAggregation("yearPicker");var F=Math.floor(z/2);if(F>20){F=20;}E.setYears(F);}i.call(this);if(this.getDomRef()){if(this._getShowItemHeader()){this.$().addClass("sapUiCalIntHead");}else{this.$().removeClass("sapUiCalIntHead");}}return this;};c.prototype._getMonths=function(){var z=this.getMonths();if(sap.ui.Device.system.phone&&z>6){return 6;}else{return z;}};c.prototype._getLocaleData=function(){if(!this._oLocaleData){var z=this.getLocale();var A=new sap.ui.core.Locale(z);this._oLocaleData=L.getInstance(A);}return this._oLocaleData;};c.prototype.setPickerPopup=function(P){this.setProperty("pickerPopup",P,true);var z=this.getAggregation("yearPicker");if(P){z.setColumns(4);z.setYears(20);}else{z.setColumns(0);z.setYears(6);}return this;};c.prototype.setMinDate=function(z){if(q.sap.equal(z,this.getMinDate())){return this;}if(!z){this._oMinDate.getJSDate().setUTCFullYear(1);this._oMinDate.getJSDate().setUTCMonth(0);this._oMinDate.getJSDate().setUTCDate(1);}else{if(!(z instanceof Date)){throw new Error("Date must be a JavaScript date object; "+this);}this._oMinDate=a._createUniversalUTCDate(z);this._oMinDate.setDate(1);var A=this._oMinDate.getUTCFullYear();if(A<1||A>9999){throw new Error("Date must not be in valid range (between 0001-01-01 and 9999-12-31); "+this);}if(this._oMaxDate.getTime()<this._oMinDate.getTime()){q.sap.log.warning("minDate > maxDate -> maxDate set to end of the month",this);this._oMaxDate=a._createUniversalUTCDate(z);this._oMaxDate.setUTCMonth(this._oMaxDate.getUTCMonth()+1,0);this.setProperty("maxDate",a._createLocalDate(this._oMaxDate),true);}if(this._oFocusedDate){if(this._oFocusedDate.getTime()<this._oMinDate.getTime()){q.sap.log.warning("focused date < minDate -> minDate focused",this);this.focusDate(z);}}if(this._oUTCStartDate&&this._oUTCStartDate.getTime()<this._oMinDate.getTime()){q.sap.log.warning("start date < minDate -> minDate set as start date",this);_.call(this,new U(this._oMinDate.getTime()),true,true);}}this.setProperty("minDate",z,false);var B=this.getAggregation("yearPicker");B._oMinDate.setUTCFullYear(this._oMinDate.getUTCFullYear());return this;};c.prototype.setMaxDate=function(z){if(q.sap.equal(z,this.getMaxDate())){return this;}if(!z){this._oMaxDate.getJSDate().setUTCFullYear(9999);this._oMaxDate.getJSDate().setUTCMonth(11);this._oMaxDate.getJSDate().setUTCDate(31);}else{if(!(z instanceof Date)){throw new Error("Date must be a JavaScript date object; "+this);}this._oMaxDate=a._createUniversalUTCDate(z);this._oMaxDate.setUTCMonth(this._oMaxDate.getUTCMonth()+1,0);var A=this._oMaxDate.getUTCFullYear();if(A<1||A>9999){throw new Error("Date must not be in valid range (between 0001-01-01 and 9999-12-31); "+this);}if(this._oMinDate.getTime()>this._oMaxDate.getTime()){q.sap.log.warning("maxDate < minDate -> minDate set to begin of the month",this);this._oMinDate=a._createUniversalUTCDate(z);this._oMinDate.setUTCDate(1);this.setProperty("minDate",a._createLocalDate(this._oMinDate),true);}if(this._oFocusedDate){if(this._oFocusedDate.getTime()>this._oMaxDate.getTime()){q.sap.log.warning("focused date > maxDate -> maxDate focused",this);this.focusDate(z);}}if(this._oUTCStartDate){var E=new U(this._oUTCStartDate.getTime());E.setUTCDate(1);E.setUTCMonth(E.getUTCMonth()+this._getMonths());E.setUTCDate(0);if(E.getTime()>this._oMaxDate.getTime()){var S=new U(this._oMaxDate.getTime());S.setUTCDate(1);S.setUTCMonth(S.getUTCMonth()-this._getMonths()+1);if(S.getTime()>=this._oMinDate.getTime()){q.sap.log.warning("end date > maxDate -> maxDate set as end date",this);_.call(this,S,true,true);}}}}this.setProperty("maxDate",z,false);var B=this.getAggregation("yearPicker");B._oMaxDate.setUTCFullYear(this._oMaxDate.getUTCFullYear());return this;};c.prototype.onclick=function(E){if(E.isMarked("delayedMouseEvent")){return;}if(E.target.id==this.getId()+"-cancel"){this.onsapescape(E);}};c.prototype.onmousedown=function(E){E.preventDefault();E.setMark("cancelAutoClose");};c.prototype.onsapescape=function(E){switch(this._iMode){case 0:this.fireCancel();break;case 1:h.call(this);break;}};c.prototype.onsaptabnext=function(E){var z=this.getAggregation("header");if(q.sap.containsOrEquals(this.getDomRef("content"),E.target)){q.sap.focus(z.getDomRef("B2"));if(!this._bPoupupMode){var A=this.getAggregation("monthsRow");var B=this.getAggregation("yearPicker");q(A._oItemNavigation.getItemDomRefs()[A._oItemNavigation.getFocusedIndex()]).attr("tabindex","-1");if(B.getDomRef()){q(B._oItemNavigation.getItemDomRefs()[B._oItemNavigation.getFocusedIndex()]).attr("tabindex","-1");}}E.preventDefault();}};c.prototype.onsaptabprevious=function(E){var z=this.getAggregation("header");if(q.sap.containsOrEquals(this.getDomRef("content"),E.target)){if(this._bPoupupMode){q.sap.focus(z.getDomRef("B2"));E.preventDefault();}}else if(E.target.id==z.getId()+"-B2"){var A=this.getAggregation("monthsRow");var B=this.getAggregation("yearPicker");switch(this._iMode){case 0:A._oItemNavigation.focusItem(A._oItemNavigation.getFocusedIndex());break;case 1:B._oItemNavigation.focusItem(B._oItemNavigation.getFocusedIndex());break;}E.preventDefault();}};c.prototype.onfocusin=function(E){if(E.target.id==this.getId()+"-end"){var z=this.getAggregation("header");var A=this.getAggregation("monthsRow");var B=this.getAggregation("yearPicker");q.sap.focus(z.getDomRef("B2"));if(!this._bPoupupMode){q(A._oItemNavigation.getItemDomRefs()[A._oItemNavigation.getFocusedIndex()]).attr("tabindex","-1");if(B.getDomRef()){q(B._oItemNavigation.getItemDomRefs()[B._oItemNavigation.getFocusedIndex()]).attr("tabindex","-1");}}}this.$("end").attr("tabindex","-1");};c.prototype.onsapfocusleave=function(E){if(!E.relatedControlId||!q.sap.containsOrEquals(this.getDomRef(),sap.ui.getCore().byId(E.relatedControlId).getFocusDomRef())){this.$("end").attr("tabindex","0");if(!this._bPoupupMode){var z=this.getAggregation("monthsRow");var A=this.getAggregation("yearPicker");switch(this._iMode){case 0:q(z._oItemNavigation.getItemDomRefs()[z._oItemNavigation.getFocusedIndex()]).attr("tabindex","0");break;case 1:q(A._oItemNavigation.getItemDomRefs()[A._oItemNavigation.getFocusedIndex()]).attr("tabindex","0");break;}}}};c.prototype._handlePrevious=function(E){var F=this._getFocusedDate();var z=this.getAggregation("yearPicker");var A=this._getMonths();var S=new U(d.call(this).getTime());switch(this._iMode){case 0:S.setUTCMonth(S.getUTCMonth()-A);F.setUTCMonth(F.getUTCMonth()-A);this._setFocusedDate(F);_.call(this,S,true);break;case 1:z.previousPage();k.call(this);break;}};c.prototype._handleNext=function(E){var F=this._getFocusedDate();var z=this.getAggregation("yearPicker");var A=this._getMonths();var S=new U(d.call(this).getTime());switch(this._iMode){case 0:S.setUTCMonth(S.getUTCMonth()+A);F.setUTCMonth(F.getUTCMonth()+A);this._setFocusedDate(F);_.call(this,S,true);break;case 1:z.nextPage();k.call(this);break;}};c.prototype._getShowItemHeader=function(){var z=this.getMonths();if(z>this._iDaysMonthsHead){return true;}else{return false;}};function _(S,z,N){var A=new U(this._oMaxDate.getTime());A.setUTCDate(1);A.setUTCMonth(A.getUTCMonth()-this._getMonths()+1);if(A.getTime()<this._oMinDate.getTime()){A=new U(this._oMinDate.getTime());A.setUTCMonth(A.getUTCMonth()+this._getMonths()-1);}if(S.getTime()<this._oMinDate.getTime()){S=new U(this._oMinDate.getTime());}else if(S.getTime()>A.getTime()){S=A;}S.setUTCDate(1);var B=a._createLocalDate(S);this.setProperty("startDate",B,true);this._oUTCStartDate=S;var E=this.getAggregation("monthsRow");E.setStartDate(B);i.call(this);if(z){var F=a._createLocalDate(this._getFocusedDate());if(!E.checkDateFocusable(F)){this._setFocusedDate(S);E.setDate(B);}else{E.setDate(F);}}if(!N){this.fireStartDateChange();}}function d(){if(!this._oUTCStartDate){this._oUTCStartDate=this._getFocusedDate();this._oUTCStartDate.setUTCDate(1);}return this._oUTCStartDate;}function e(N){var z=this._getFocusedDate();var A=this.getAggregation("monthsRow");if(!N){A.setDate(a._createLocalDate(z));}else{A.displayDate(a._createLocalDate(z));}i.call(this);}function f(){var S=this.getSelectedDates();if(S&&S[0]&&S[0].getStartDate()){this._oFocusedDate=a._createUniversalUTCDate(S[0].getStartDate());this._oFocusedDate.setUTCDate(1);}else{var N=new Date();this._oFocusedDate=a._createUniversalUTCDate(N);this._oFocusedDate.setUTCDate(1);}if(this._oFocusedDate.getTime()<this._oMinDate.getTime()){this._oFocusedDate=new U(this._oMinDate.getTime());}else if(this._oFocusedDate.getTime()>this._oMaxDate.getTime()){this._oFocusedDate=new U(this._oMaxDate.getTime());}}function g(){var z=this._getFocusedDate();var A=this.getAggregation("yearPicker");if(!this.getPickerPopup()){if(A.getDomRef()){A.$().css("display","");}else{var R=sap.ui.getCore().createRenderManager();var $=this.$("content");R.renderControl(A);R.flush($[0],false,true);R.destroy();}}else{w.call(this,A);}this.$("contentOver").css("display","");A.setDate(z.getJSDate());if(this._iMode==0){var B=this.getAggregation("monthsRow");q(B._oItemNavigation.getItemDomRefs()[B._oItemNavigation.getFocusedIndex()]).attr("tabindex","-1");}k.call(this);this._iMode=1;}function h(N){this._iMode=0;if(!this.getPickerPopup()){var z=this.getAggregation("yearPicker");z.$().css("display","none");}else if(this._oPopup.isOpen()){this._oPopup.close();}this.$("contentOver").css("display","none");if(!N){e.call(this);var A=this.getAggregation("monthsRow");q(A._oItemNavigation.getItemDomRefs()[A._oItemNavigation.getFocusedIndex()]).attr("tabindex","0");}}function i(){m.call(this);j.call(this);}function j(){var z=new U(d.call(this).getTime());var A=this._getMonths();var B=z.getJSDate().getUTCFullYear();var E=this._oMaxDate.getJSDate().getUTCFullYear();var F=this._oMinDate.getJSDate().getUTCFullYear();var G=z.getJSDate().getUTCMonth();var I=this._oMaxDate.getJSDate().getUTCMonth();var J=this._oMinDate.getJSDate().getUTCMonth();var K=this.getAggregation("header");if(B<F||(B==F&&G<=J)){K.setEnabledPrevious(false);}else{K.setEnabledPrevious(true);}z.setUTCMonth(z.getUTCMonth()+A-1);B=z.getJSDate().getUTCFullYear();G=z.getJSDate().getUTCMonth();if(B>E||(B==E&&G>=I)){K.setEnabledNext(false);}else{K.setEnabledNext(true);}}function k(){var z=this.getAggregation("yearPicker");var A=z.getYears();var B=a._createUniversalUTCDate(z.getFirstRenderedDate());B.setUTCFullYear(B.getUTCFullYear()+Math.floor(A/2));var E=this.getAggregation("header");var F=new U(this._oMaxDate);F.setUTCFullYear(F.getUTCFullYear()-Math.ceil(A/2));F.setUTCMonth(11,31);var G=new U(this._oMinDate);G.setUTCFullYear(G.getUTCFullYear()+Math.floor(A/2)+1);G.setUTCMonth(0,1);if(B.getTime()>F.getTime()){E.setEnabledNext(false);}else{E.setEnabledNext(true);}if(B.getTime()<G.getTime()){E.setEnabledPrevious(false);}else{E.setEnabledPrevious(true);}}function m(){var T;var S=d.call(this);var z=this._oYearFormat.format(S,true);var E=new U(S.getTime());E.setUTCMonth(E.getUTCMonth()+this._getMonths()-1);var A=this._oYearFormat.format(E,true);if(z!=A){var B=this._getLocaleData();var P=B.getIntervalPattern();T=P.replace(/\{0\}/,z).replace(/\{1\}/,A);}else{T=z;}var F=this.getAggregation("header");F.setTextButton2(T);}function n(z,N){var F;var A=false;if(z.getTime()<this._oMinDate.getTime()){F=this._oMinDate;A=true;}else if(z.getTime()>this._oMaxDate.getTime()){F=this._oMaxDate;A=true;}else{F=z;}this._setFocusedDate(F);if(A||N){v.call(this,F);e.call(this,false);this.fireStartDateChange();}}function o(z,N){if(z&&(!this._oFocusedDate||this._oFocusedDate.getTime()!=z.getTime())){if(!(z instanceof Date)){throw new Error("Date must be a JavaScript date object; "+this);}z=a._createUniversalUTCDate(z);var A=z.getUTCFullYear();if(A<1||A>9999){throw new Error("Date must not be in valid range (between 0001-01-01 and 9999-12-31); "+this);}if(z.getTime()<this._oMinDate.getTime()||z.getTime()>this._oMaxDate.getTime()){throw new Error("Date must not be in valid range (minDate and maxDate); "+this);}this._setFocusedDate(z);if(this.getDomRef()&&this._iMode==0){e.call(this,N);}}}function p(E){if(this._iMode!=1){g.call(this);}else{h.call(this);}}function r(E){this.fireSelect();}function s(E){var z=a._createUniversalUTCDate(E.getParameter("date"));var N=E.getParameter("notVisible");n.call(this,z,N);}function t(E){var F=new U(this._getFocusedDate().getTime());var z=this.getAggregation("yearPicker");var A=a._createUniversalUTCDate(z.getDate());A.setUTCMonth(F.getUTCMonth(),F.getUTCDate());F=A;n.call(this,F,true);h.call(this);}function u(){this._sInvalidateContent=undefined;var z=this.getAggregation("monthsRow");z._bDateRangeChanged=true;z._bInvalidateSync=true;z.invalidate();z._bInvalidateSync=undefined;this._bDateRangeChanged=undefined;}function v(z){var A=this.getAggregation("monthsRow");var S=d.call(this);var B=A._oItemNavigation.getFocusedIndex();S=new U(z.getTime());S.setUTCMonth(S.getUTCMonth()-B);_.call(this,S,false,true);}function w(P){if(!this._oPopup){q.sap.require("sap.ui.core.Popup");this._oPopup=new sap.ui.core.Popup();this._oPopup.setAutoClose(true);this._oPopup.setAutoCloseAreas([this.getDomRef()]);this._oPopup.setDurations(0,0);this._oPopup._oCalendar=this;this._oPopup.attachClosed(x,this);this._oPopup.onsapescape=function(E){this._oCalendar.onsapescape(E);};}this._oPopup.setContent(P);var z=this.getAggregation("header");var A=sap.ui.core.Popup.Dock;this._oPopup.open(0,A.CenterTop,A.CenterBottom,z,null,"flipfit",true);}function x(E){switch(this._iMode){case 0:break;case 1:h.call(this);break;}}function y(E){k.call(this);}return c;},true);
