/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2016 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','./library','sap/ui/core/Control'],function(q,l,C){"use strict";var T=C.extend("sap.m.TileContent",{metadata:{library:"sap.m",properties:{"footer":{type:"string",group:"Appearance",defaultValue:null},"size":{type:"sap.m.Size",group:"Misc",defaultValue:"Auto"},"unit":{type:"string",group:"Misc",defaultValue:null},"disabled":{type:"boolean",group:"Misc",defaultValue:false},"frameType":{type:"sap.m.FrameType",group:"Appearance",defaultValue:sap.m.FrameType.Auto}},defaultAggregation:"content",aggregations:{"content":{type:"sap.ui.core.Control",multiple:false,bindable:"bindable"}}}});T.prototype.init=function(){this._bRenderFooter=true;};T.prototype.onBeforeRendering=function(){if(this.getContent()&&this._oDelegate){if(this.getDisabled()){this.getContent().addDelegate(this._oDelegate);}else{this.getContent().removeDelegate(this._oDelegate);}}};T.prototype.onAfterRendering=function(){var c=this.getContent();if(c){var t=this.$();if(!t.attr("title")){var s=c.getTooltip_AsString();var a=t.find("*");a.removeAttr("title");if(s&&s.trim().length!==0){if(this._getFooterText().trim()!==0){s=s+"\n"+this._getFooterText();}t.attr("title",s);}}}};T.prototype._getContentType=function(){if(this.getContent()){var c=this.getContent().getMetadata().getName();if(c==="sap.m.NewsContent"||c==="sap.suite.ui.commons.NewsContent"){return"News";}}};T.prototype._getFooterText=function(){var r=sap.ui.getCore().getLibraryResourceBundle('sap.m');var f=this.getFooter();var u=this.getUnit();if(u){if(f){if(sap.ui.getCore().getConfiguration().getRTL()){return r.getText('TILECONTENT_FOOTER_TEXT',[f,u]);}else{return r.getText('TILECONTENT_FOOTER_TEXT',[u,f]);}}else{return u;}}else{return f;}};T.prototype.getAltText=function(){var a="";var i=true;var c=this.getContent();if(c){if(c.getAltText){a+=c.getAltText();i=false;}else if(c.getTooltip_AsString()){a+=c.getTooltip_AsString();i=false;}}if(this.getUnit()){a+=(i?"":"\n")+this.getUnit();i=false;}if(this.getFooter()){a+=(i?"":"\n")+this.getFooter();}return a;};T.prototype.getTooltip_AsString=function(){var t=this.getTooltip();var a="";if(typeof t==="string"||t instanceof String){return t;}a=this.getAltText();return a?a:"";};T.prototype.setRenderFooter=function(v){this._bRenderFooter=v;return this;};return T;},true);
