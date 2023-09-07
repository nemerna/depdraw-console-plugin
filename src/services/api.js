// api.js
import axios from 'axios';

const BASE_URL = 'http://localhost:8080';

export async function deleteDiagram(diagramUuid) {
  const response = await fetch(`${BASE_URL}/diagrams/${diagramUuid}`, {
    method: 'DELETE',
  });
  return response.ok;
}

export async function fetchDiagrams() {
  try {
    const response = await axios.get(`${BASE_URL}/diagrams`);
    return response.data; // Return the data
  } catch (error) {
    console.error('Error fetching diagrams:', error);
    throw error; // Rethrow the error
  }
}

export async function fetchDiagram(diagramUuid) {
  const response = await fetch(`${BASE_URL}/diagrams/${diagramUuid}`);
  return response.json();
}

export async function fetchDiagramResources(diagramUuid) {
  const response = await fetch(`${BASE_URL}/diagrams/${diagramUuid}/resources`);
  return response.json();
}

export async function fetchDiagramLines(diagramUuid) {
  const response = await fetch(`${BASE_URL}/diagrams/${diagramUuid}/lines`);
  return response.json();
}



export async function createDiagram(diagramName) {



  const response = await fetch(`${BASE_URL}/diagrams`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name: diagramName } ),
  });
  return response.json();
}

export async function createNode(diagramUuid, node) {



  const response = await fetch(`${BASE_URL}/diagrams/${diagramUuid}/resources`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(node),
  });
  return response.json();
}


export async function createEdge(diagramUuid, data) {
  const response = await fetch(`${BASE_URL}/diagrams/${diagramUuid}/lines`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return response.json();
}

export async function deleteNode(diagramUuid, nodeUuid) {
  const response = await fetch(`${BASE_URL}/diagrams/${diagramUuid}/resources/${nodeUuid}`, {
    method: 'DELETE',
  });
  return response.ok;
}

export async function updateNode(diagramUuid, nodeUuid, node) {
  const response = await fetch(`${BASE_URL}/diagrams/${diagramUuid}/resources/${nodeUuid}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(node.data.backend_data),
  });
  return response.json();
}


export async function updateNodeDirectly(diagramUuid, nodeUuid, node) {
  const response = await fetch(`${BASE_URL}/diagrams/${diagramUuid}/resources/${nodeUuid}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(node),
  });
  return response.json();
}