function getY(max, min, height, diff, value) {
  let y = (value - min) * height / (max - min);
  if (isNaN(y)) y = 0;
  if (y ===  Infinity) y = Number.MAX_SAFE_INTEGER;
  if (y === -Infinity) y = Number.MIN_SAFE_INTEGER;
  return parseFloat((height - y + diff).toFixed(2));
}

function removeChildren(svg) {
  [...svg.querySelectorAll("*")].forEach(element => svg.removeChild(element));
}

function defaultFetch(entry) {
  return entry.value;
}

function buildElement(tag, attrs) {
  const element = document.createElementNS("http://www.w3.org/2000/svg", tag);

  for (let name in attrs) {
    element.setAttribute(name, attrs[name]);
  }

  return element;
}

export function sparkline(svg, entries, options) {
  removeChildren(svg);

  if (entries.length <= 1) {
    return;
  }

  options = options || {};

  if (typeof(entries[0]) === "number") {
    entries = entries.map(entry => {
      return {value: entry};
    });
  }

  // This function will be called whenever the mouse moves
  // over the SVG. You can use it to render something like a
  // tooltip.
  const onmousemove = options.onmousemove;

  // This function will be called whenever the mouse leaves
  // the SVG area. You can use it to hide the tooltip.
  const onmouseout = options.onmouseout;

  // Should we run in interactive mode? If yes, this will handle the
  // cursor and spot position when moving the mouse.
  const interactive = ("interactive" in options) ? options.interactive : !!onmousemove;

  // Define how big should be the spot area.
  const spotRadius = options.spotRadius || 2;
  const spotDiameter = spotRadius * 2;

  // Define how wide should be the cursor area.
  const cursorWidth = options.cursorWidth || 2;

  // Get the stroke width; this is used to compute the
  // rendering offset.
  let strokeWidth = 0;
  if (svg.attributes["stroke-width"]) strokeWidth = Number(svg.attributes["stroke-width"].value);
  if (isNaN(strokeWidth)) strokeWidth = 0;

  // By default, data must be formatted as an array of numbers or
  // an array of objects with the value key (like `[{value: 1}]`).
  // You can set a custom function to return data for a different
  // data structure.
  const fetch = options.fetch || defaultFetch;

  // Retrieve only values, easing the find for the maximum value.
  const values = entries.map(entry => fetch(entry));

  // The rendering width will account for the spot size.
  const width = parseFloat(svg.clientWidth) - spotDiameter * 2;

  // Get the SVG element's full height.
  // This is used
  const fullHeight = parseFloat(svg.clientHeight);

  // The rendering height accounts for stroke width and spot size.
  const height = fullHeight - (strokeWidth * 2) - spotDiameter;

  // The maximum value. This is used to calculate the Y coord of
  // each sparkline datapoint.
  const max = typeof(options.max) === "number" ? options.max : Math.max(...values.filter(value => !isNaN(value)));
  const min = typeof(options.min) === "number" ? options.min : Math.min(...values.filter(value => !isNaN(value)));

  // Some arbitrary value to remove the cursor and spot out of
  // the viewing canvas.
  const offscreen = -1000;

  // Cache the last item index.
  const lastItemIndex = values.length - 1;

  // Calculate the X coord base step.
  const offset = width / lastItemIndex;

  // Hold all datapoints, which is whatever we got as the entry plus
  // x/y coords and the index.
  const datapoints = [];
  const lines = [[]];

  values.forEach((value, index) => {
    if (isNaN(value)) {
      lines.push([]);
    } else {
      lines[lines.length-1].push({value, index});
    }
  });

  const getX = function(index) {
    return index * offset + spotDiameter;
  }

  lines.forEach((values) => {
    if (values.length) {
      let pathCoords = "";
      values.forEach((point, i) => {
        const x = getX(point.index);
        const y = getY(max, min, height, strokeWidth + spotRadius, point.value);
        pathCoords += i ? ` L ${x} ${y}` : `M${x} ${y}`;
        datapoints[point.index] = Object.assign(point, {index: point.index, x, y});
      });
      const path = buildElement("path", {
        class: "sparkline--line",
        d: pathCoords,
        fill: "none"
      });
      svg.appendChild(path);

      let fillCoords = `${pathCoords} V ${fullHeight} L ${getX(values[0].index)} ${fullHeight} Z`;
      const fill = buildElement("path", {
        class: "sparkline--fill",
        d: fillCoords,
        stroke: "none"
      });
      svg.appendChild(fill);
    }
  });

  if (!interactive) {
    return;
  }

  const cursor = buildElement("line", {
    class: "sparkline--cursor",
    x1: offscreen,
    x2: offscreen,
    y1: 0,
    y2: fullHeight,
    "stroke-width": cursorWidth
  });

  const spot = buildElement("circle", {
    class: "sparkline--spot",
    cx: offscreen,
    cy: offscreen,
    r: spotRadius
  });

  svg.appendChild(cursor);
  svg.appendChild(spot);

  const interactionLayer = buildElement("rect", {
    width: svg.clientWidth,
    height: svg.clientHeight,
    style: "fill: transparent; stroke: transparent",
    class: "sparkline--interaction-layer",
  });
  svg.appendChild(interactionLayer);

  interactionLayer.addEventListener("mouseout", event => {
    cursor.setAttribute("x1", offscreen);
    cursor.setAttribute("x2", offscreen);

    spot.setAttribute("cx", offscreen);

    if (onmouseout) {
      onmouseout(event);
    }
  });

  interactionLayer.addEventListener("mousemove", event => {
    const mouseX = event.offsetX;

    let nextDataPoint = datapoints.find(entry => {
      return entry && entry.x >= mouseX;
    });

    if (!nextDataPoint) {
      nextDataPoint = datapoints[lastItemIndex];
    }

    let previousDataPoint = datapoints[datapoints.indexOf(nextDataPoint) - 1];
    let currentDataPoint;
    let halfway;

    if (previousDataPoint) {
      halfway = previousDataPoint.x + ((nextDataPoint.x - previousDataPoint.x) / 2);
      currentDataPoint = mouseX >= halfway ? nextDataPoint : previousDataPoint;
    } else {
      currentDataPoint = nextDataPoint;
    }

    const x = currentDataPoint.x;
    const y = currentDataPoint.y;

    spot.setAttribute("cx", x);
    spot.setAttribute("cy", y);

    cursor.setAttribute("x1", x);
    cursor.setAttribute("x2", x);

    if (onmousemove) {
      onmousemove(event, currentDataPoint);
    }
  });
}

export default sparkline;
