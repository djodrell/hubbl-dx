import { headers } from 'next/headers';
import { Api } from 'sst/node/api';
import * as d3 from 'd3';

async function loadOrgData() {
  const res = await fetch(`${Api.api.url}/orgs`, {
    method: 'GET',
    headers: headers(),
  });
  if (!res.ok) {
    throw new Error('Unable to load org data');
  }
  return res.json();
}

// simple line chart https://d3js.org/getting-started#d3-in-react
export default async function Chart({
  data = [1, 3, 2, 3, 1],
  width = 640,
  height = 400,
  marginTop = 20,
  marginRight = 20,
  marginBottom = 20,
  marginLeft = 20,
}) {
  const orgData = await loadOrgData();
  console.log('org data: ', orgData);

  const x = d3.scaleLinear([0, data.length - 1], [marginLeft, width - marginRight]);
  const y = d3.scaleLinear(d3.extent(data), [height - marginBottom, marginTop]);
  const line = d3.line((d, i) => x(i), y);
  return (
    <svg width={width} height={height}>
      <path fill="none" stroke="currentColor" strokeWidth="1.5" d={line(data)} />
      <g fill="white" stroke="currentColor" strokeWidth="1.5">
        {data.map((d, i) => (
          <circle key={i} cx={x(i)} cy={y(d)} r="2.5" />
        ))}
      </g>
    </svg>
  );
}
