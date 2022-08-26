(function() {
  var defaultOptions = {
    legend: {
      position: 'right',
      font: {
        weight: 'bold',
        size: 20,
        family: 'Arial'
      }
    },
    title: {
      text: 'Pie Chart',
      font: {
        weight: 'bold',
        size: 20,
        family: 'Arial'
      }
    },
    tooltip: {
      template: '<div>Year: {{label}}</div><div>Production: {{data}}</div>',
      font: {
        weight: 'bold',
        size: 20,
        family: 'Arial'
      }
    }
  };

  var plots = [];
  var cv, ctx, width, height, op, title_text, title_position, title_height,
  title_width, radius, center, legend_width, legend_height,
  legend_posX, legend_posY, legend_textX, legend_textY, startAngle = 0, endAngle = 0,
  currentPlot, data_c;

  this.drawPie = function(data, canvas, options){
    cv = canvas;
    // canvas.onmousemove = onMouseMove;
    data_c = calculateData(data);
    if(canvas.getContext) {
      ctx = canvas.getContext("2d");
      width = canvas.width;
      height = canvas.height;
      op = generateOptions(options, defaultOptions);
      draw();
    }
  }

  function clear() {
    ctx.clearRect(0, 0, cv.width, cv.height);
    startAngle = 0;
    endAngle = 0;
    cv.onmousemove = null;
  }

  function Plot(start, end, color, data) {
    this.start = start;
    this.end = end;
    this.color = color;
    this.data = data;
  }

  Plot.prototype.drawPlot = function() {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.moveTo(center.x, center.y);
    ctx.arc(center.x, center.y, radius, this.start, this.end, false);
    ctx.closePath();
    ctx.fill();
  }

  Plot.prototype.drawLegend = function() {
    ctx.fillRect(legend_posX, legend_posY, legend_width, legend_height);
    ctx.font = 'bold 12px Arial';
    var percent = this.data.label + ' : ' + (this.data.portion * 100).toFixed(
    2) + '%';
    ctx.fillText(percent, legend_textX, legend_textY);
  }

  function replaceAttr(text, data) {
    while (text.indexOf("{{") != -1) {
      var start = text.indexOf("{{"),
          end = text.indexOf("}}"),
          attr = text.substring(start + 2, end);
      text = text.replace("{{" + attr + "}}", data[attr]);
    }
    return text;
  }

  Plot.prototype.drawTooltip = function() {
    var text = replaceAttr(op.tooltip.template, this.data);
    var width_tooltipText = ctx.measureText(text).width,
        height_tooltipText = parseInt(op.tooltip.font.size, 10),
        angle = (this.start + this.end) / 2 / (2 * Math.PI) *360;
    var tan = Math.tanh(angle),
        x = 0,
        y = 0;

    if (angle < 90)((x = radius / 2 * tan + center.x) || true) && ((y = -radius / 2 + center.y) || true)
    else if (angle > 90 && angle < 180)((x = radius / 2 * tan + center.x) || true) && ((y = radius / 2 + center.y) || true)
    else if (angle > 180 && angle < 270)((x = -radius / 2 * tan + center.x) || true) && ((y = radius / 2 + center.y) || true)
    else if (angle > 270 && angle < 360)((x = -radius / 2 * tan + center.x) || true) && ((y = -radius / 2 + center.y) || true)
    var tooltip_box_x = x - radius / 4,
        tooltip_box_y = y,
        tooltip_box_width = width_tooltipText + 10,
        tooltip_box_height = height_tooltipText + 10,
        tooltip_text_x = x - radius / 4 + 5,
        tooltip_text_y = y + 10 + 2;
    ctx.fillStyle = 'white';
    ctx.fillRect(tooltip_box_x, tooltip_box_y, tooltip_box_width, tooltip_box_height);
    ctx.fillStyle = '#000';
    ctx.fillText(text, tooltip_text_x, tooltip_text_y);
  }

  function draw() {
    clear();
    title_text = op.title.text;
    ctx.font = op.title.font.weight + " " + op.title.font.size + "px " + op.title.font.family;
    title_width = ctx.measureText(title_text).width;
    title_height = op.title.font.size;
    title_position = {
      x: (width, title_width) / 2,
      y: 20 + title_height
    };
    ctx.fillText(title_text, title_position.x, title_position.y);
    radius = (height - title_height - title_position.y - 20) / 2;
    center = {
      x: radius + 20,
      y: radius + 30 + title_position.y
    };
    legend_width = op.legend.font.size * 2.5;
    legend_height = op.legend.font.size * 1.2;
    legend_posX = center.x * 2 + 20;
    legend_posY = 80;
    legend_textX = legend_posX + legend_width + 5;
    legend_textY = legend_posY + op.legend.font.size * 0.9;
    ctx.strokeStyle = 'grey';
    ctx.lineWidth = 3;
    ctx.strokeRect(0, 0, width, height);

    for (var i = 0, len = data_c.length; i < len; i++) {
      endAngle += data_c[i].portion * 2 * Math.PI;
      var plot = new Plot(startAngle, endAngle, data_c[i].color, data_c[i])
      plots.push(plot);
      plot.drawPlot();
      startAngle = endAngle;
      legend_posY += (10 + legend_height);
      legend_textY += (10 + legend_height);
      plot.drawLegend();
    }
    if (currentPlot) {
      currentPlot.drawTooltip();
    }
    cv.onmousemove = onMouseMove;
  }

  function onMouseMove(e) {
    var ex = e.pageX - cv.offsetLeft, ey = e.pageY - cv.offsetTop;
    var angle = getAngle(center.x, center.y, ex, ey);
    for(let i = 0; i < plots.length; i++) {
      if(plots[i].start < angle && plots[i].end > angle) {
        if(currentPlot != plots[i]) {
          currentPlot = plots[i];
          draw();
        }
        return;
      }
      currentPlot == null;
      draw();
    }
  }

  function mergeJSON(source1,source2){
    var mergedJSON = JSON.parse(JSON.stringify(source2));
    for (var attrname in source1) {
      if(mergedJSON.hasOwnProperty(attrname)) {
        if ( source1[attrname]!=null && source1[attrname].constructor==Object ) {
          mergedJSON[attrname] = mergeJSON(source1[attrname], mergedJSON[attrname]);
        }
      } else {
        mergedJSON[attrname] = source1[attrname];
      }
    }
    return mergedJSON;
  }

  function generateOptions(givenOptions, defaultOptions) {
    return mergeJSON(defaultOptions, givenOptions);
  }
  function calculateData(data) {
    if(data instanceof Array) {
      var sum = data.reduce(function(a, b) {
        return a + b.data;
    }, 0);
    var map = data.map(function(a) {
      return {
        label: a.label,
        data: a.data,
        color: a.color,
        portion: a.data/sum
      }
    });
    return map;
    }
  }

  function getAngle(cx, cy, mx, my) {
    var x = Math.abs(cx - mx),
        y = Math.abs(cy - my),
        z = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2)),
        cos = y / z,
        radina = Math.acos(cos);
    if (mx > cx && my > cy) {
      return radina;
    } else if (mx < cx && my > cy) {
      return Math.PI / 2 + radina;
    } else if (mx > cx && my < cy) {
      return 3 * Math.PI / 2 - radina
    } else {
      return 3 * Math.PI / 2 + radina
    }
  }
})(window)
