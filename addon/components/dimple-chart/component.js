// Generated by CoffeeScript 1.8.0

/**
 * DimpleChartComponent.
 *
 * Allows for setting of the `data` property and provides some hooks
 * for custom chart drawing.
 * @class DimpleChartComponent
 */
import Ember from 'ember';
import ResizeMixin from 'ember-cli-dimple/mixins/resize';
var DimpleChartComponent;

DimpleChartComponent = Ember.Component.extend(ResizeMixin, Ember.Evented, {
  classNames: ["dimple-chart"],

  /**
   * The time for charts to draw.
   *
   * @property {Number} drawDuration The time for charts to draw, in ms
   * @type {Number}
   */
  drawDuration: 1000,

  /**
   * The chart object with all settings applied and data attached.
   *
   * @property {Dimple} chart The complete chart object, ready to `draw()`
   */
  chart: (function() {
    var chart;
    if (!(chart = this.get("chartModel"))) {
      return;
    }
    chart.data = this.get("_data");
    return chart;
  }).property("chartModel", "_data"),

  /**
   * Data property. This will be passed in to the component from the outside world.
   *
   * @property {Mixed} data The data to be charted
   */
  data: null,

  /**
   * Remap passed-in data.
   * Typically this is used to map data fields to Dimple, but it can be more extensive.
   *
   * @param  {Mixed}  data The incoming data
   * @return {Mixed}       The remapped data as will be passed to Dimple
   */
  remap: function(data) {
    return data;
  },

  /**
   * The customizeChart function.
   * Once the data is loaded and the SVG is initialized,
   * the chart can be customized prior to drawing.
   * Typically this involves setting axes.
   *
   * @method customizeChart
   * @param {Dimple} chart The chart to be customized
   */
  customizeChart: Ember.K,

  /**
   * Local copy of DimpleJS.
   * Use @get("dimple") for all your charting needs.
   *
   * @property {Object} dimple Local Dimple
   */
  dimple: dimple,

  /**
   * Local d3.
   * At the time of writing d3 is a global but that may not always be the case
   *
   * @property {Object} d3 local d3
   */
  d3: d3,

  /**
   * Internal data. This is what the chart will use to draw.
   *
   * @private
   * @property {Array} _data The internally stored data when the `data` computed property
   * is used as a setter.
   * @type {Array}
   */
  _data: (function() {
    var data;
    if (data = this.get("data")) {
      return this.remap(data);
    }
  }).property("data"),

  /**
   * The ChartModel: A Dimple chart attached to an SVG
   *
   * @property {Object} chartModel The current chart model.
   * @type {Dimple}
   */
  chartModel: null,

  /**
   * Private didInsert handler
   * Draw the SVG and initialize chart drawing.
   *
   * @private
   */
  _didInsertElement: (function() {
    return Ember.run.scheduleOnce("afterRender", this, function() {
      var svg;
      svg = this.dimple.newSvg("#" + this.$().attr("id"));
      return this.trigger("didInsertSvg", svg);
    });
  }).on("didInsertElement"),

  /**
   * Protected init method for chart model.
   *
   * @protected
   * @param  {Dimple SVG} svg The newly created SVG
   */
  _initChartModel: (function(svg) {
    var chartModel;
    if (!svg) {
      return;
    }
    chartModel = new this.dimple.chart(svg, []);
    this._customizeChart(chartModel);
    this.get("customizeChart").call(this, chartModel);
    return this.set("chartModel", chartModel);
  }).on("didInsertSvg"),

  /**
   * Private customizeChart method.
   *
   * @method _customizeChart
   * @param  {chartModel} chart The base chart model
   * @return {chart}            A basic chart that can be further customized by subclasses.
   */
  _customizeChart: function(chart) {
    return chart.setBounds("10%", "10%", "80%", "80%");
  },

  /**
   * Update the chart. This happens any time the chart changes.
   *
   * @protected
   * @method updateChart
   * @param {Boolean} noDataUpdate True if the data should not be refreshed.
   */
  updateChart: (function(noDataUpdate) {
    var chart;
    if (!(chart = this.get("chart"))) {
      return;
    }
    return Ember.run.scheduleOnce("afterRender", this, function() {
      return this.doDraw(chart, noDataUpdate);
    });
  }).observes("chart"),

  /**
   * The actual draw function
   *
   * @method doDraw
   * @param  {Dimple} chart The chart to draw.
   */
  doDraw: function(chart, noDataUpdate) {
    var svg, _ref;
    if (!((svg = chart != null ? (_ref = chart.svg) != null ? _ref[0] : void 0 : void 0) && (!Ember.isEmpty(chart.data)))) {
      return;
    }
    return chart.draw(this.get("drawDuration", noDataUpdate));
  },

  /**
   * Update the chart when resized.
   *
   * @private
   * @see mixins/resize
   */
  onResizeEnd: (function() {
    return this.updateChart(true);
  })
});

export default DimpleChartComponent;
