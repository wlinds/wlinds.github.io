import { useState, useEffect, useRef, useCallback } from "react";
import * as d3 from "d3";
import "./MLConceptsPage.css";

export default function MLConceptsPage() {
  const svgRef = useRef(null);
  const containerRef = useRef(null);
  const simulationRef = useRef(null);
  const [detail, setDetail] = useState(null);
  const [physicsEnabled, setPhysicsEnabled] = useState(true);

  const getNodeRadius = useCallback((concept) => {
    const baseSize = 30;
    const tagBonus = concept.tags.length * 2;
    const yearBonus = (2024 - parseInt(concept.year)) / 20;
    return baseSize + tagBonus + yearBonus;
  }, []);

  const getNodeColor = useCallback((node) => {
    return node.type === "supervised"
      ? "rgba(40, 200, 245, 0.1)"
      : "rgba(72, 200, 245, 0.2)";
  }, []);

  const areConceptsRelated = useCallback((a, b) => {
    return (
      a.tags.some((tag) => b.tags.includes(tag)) ||
      Math.abs(parseInt(a.year) - parseInt(b.year)) < 10
    );
  }, []);

  useEffect(() => {
    let destroyed = false;

    fetch("/data/ml_concepts.json")
      .then((r) => r.json())
      .then((data) => {
        if (destroyed) return;

        const width = window.innerWidth;
        const height = window.innerHeight - 60;

        const nodes = Object.entries(data).map(([name, concept]) => ({
          id: name,
          ...concept,
          radius: getNodeRadius(concept),
        }));

        const links = [];
        nodes.forEach((node, i) => {
          nodes.slice(i + 1).forEach((other) => {
            if (areConceptsRelated(node, other)) {
              links.push({ source: node.id, target: other.id });
            }
          });
        });

        const svg = d3
          .select(svgRef.current)
          .attr("width", width)
          .attr("height", height);

        svg.selectAll("*").remove();

        const container = svg.append("g").attr("class", "container");
        containerRef.current = container;

        const simulation = d3
          .forceSimulation(nodes)
          .force("charge", d3.forceManyBody().strength(-200))
          .force("center", d3.forceCenter(width / 2, height / 2))
          .force(
            "collision",
            d3.forceCollide().radius((d) => d.radius + 10)
          )
          .force(
            "link",
            d3.forceLink(links).id((d) => d.id).distance(100)
          )
          .on("tick", ticked);

        simulationRef.current = simulation;

        container
          .append("g")
          .attr("class", "links")
          .selectAll("line")
          .data(links)
          .enter()
          .append("line")
          .attr("class", "link");

        const node = container
          .append("g")
          .attr("class", "nodes")
          .selectAll(".node")
          .data(nodes)
          .enter()
          .append("g")
          .attr("class", "node")
          .call(
            d3
              .drag()
              .on("start", dragstarted)
              .on("drag", dragged)
              .on("end", dragended)
          );

        node
          .append("circle")
          .attr("class", "node-circle")
          .attr("r", (d) => d.radius)
          .style("fill", (d) => getNodeColor(d));

        node
          .append("text")
          .attr("class", "node-text")
          .attr("dy", ".35em")
          .text((d) => d.id)
          .style("font-size", (d) => Math.max(8, d.radius / 3) + "px");

        node.on("click", (event, d) => {
          setDetail(d);
        });

        const zoom = d3
          .zoom()
          .scaleExtent([0.1, 4])
          .on("zoom", (event) => {
            container.attr("transform", event.transform);
          });

        svg.call(zoom);

        function ticked() {
          container
            .selectAll("line")
            .attr("x1", (d) => d.source.x)
            .attr("y1", (d) => d.source.y)
            .attr("x2", (d) => d.target.x)
            .attr("y2", (d) => d.target.y);

          container
            .selectAll(".node")
            .attr("transform", (d) => `translate(${d.x},${d.y})`);
        }

        function dragstarted(event) {
          if (!event.active) simulation.alphaTarget(0.3).restart();
          event.subject.fx = event.subject.x;
          event.subject.fy = event.subject.y;
        }

        function dragged(event) {
          event.subject.fx = event.x;
          event.subject.fy = event.y;
        }

        function dragended(event) {
          if (!event.active) simulation.alphaTarget(0);
          event.subject.fx = null;
          event.subject.fy = null;
        }
      })
      .catch(console.error);

    return () => {
      destroyed = true;
      if (simulationRef.current) simulationRef.current.stop();
    };
  }, [getNodeRadius, getNodeColor, areConceptsRelated]);

  const togglePhysics = () => {
    setPhysicsEnabled((prev) => {
      const next = !prev;
      if (simulationRef.current) {
        if (next) simulationRef.current.restart();
        else simulationRef.current.stop();
      }
      return next;
    });
  };

  return (
    <div className="ml-page">
      <div className="network-container">
        <svg ref={svgRef} id="network" />
      </div>

      {detail && (
        <div className="detail-panel active">
          <button className="close-btn" onClick={() => setDetail(null)}>
            &times;
          </button>
          <div className="detail-content">
            <h2 className="detail-title">{detail.id}</h2>
            <div className="detail-year">{detail.year}</div>
            <div className="detail-tags">
              {detail.tags.map((tag) => (
                <span className="tag" key={tag}>
                  {tag}
                </span>
              ))}
            </div>
            {detail.img && (
              <>
                <img src={detail.img.replace(/^\.\.\//, "/")} alt={detail.id} className="detail-image" />
                <p dangerouslySetInnerHTML={{ __html: detail.img_description }} />
              </>
            )}
            <p dangerouslySetInnerHTML={{ __html: detail.paragraph }} />
          </div>
        </div>
      )}

      <div className="controls">
        <button className="control-btn" onClick={() => setDetail(null)}>
          Reset
        </button>
        <button className="control-btn" onClick={togglePhysics}>
          {physicsEnabled ? "Pause Physics" : "Resume Physics"}
        </button>
      </div>
    </div>
  );
}
