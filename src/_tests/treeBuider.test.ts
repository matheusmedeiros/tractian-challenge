import { describe, it, expect } from 'vitest';
import { buildTree } from '../utils/treeBuider';
import { ComponentNode } from '../types/tree';
import {  Asset, Location } from '../types/api'

const mockLocations: Location[] = [
  {
    id: "location1",
    name: "Production Area",
    parentId: null
  },
  {
    id: "location2",
    name: "Storage Sector",
    parentId: "location1"
  }
];

const mockAssets: Asset[] = [
  {
    id: "asset1",
    name: "Conveyor Belt",
    locationId: "location2",
    parentId: null
  },
  {
    id: "asset2",
    name: "Motor Assembly",
    parentId: "asset1",
    locationId: null
  },
  {
    id: "component1",
    name: "Temperature Sensor",
    parentId: "asset2",
    sensorId: "TEMP001",
    sensorType: "energy",
    status: "operating",
    gatewayId: "GW001",
    locationId: null
  },
  {
    id: "component2",
    name: "External Sensor",
    parentId: null,
    sensorId: "TEMP002",
    sensorType: "vibration",
    status: "alert",
    gatewayId: "GW002",
    locationId: null
  }
];

describe('buildTree', () => {
  it('should create a proper tree structure from locations and assets', () => {
    const tree = buildTree(mockLocations, mockAssets);
    
    expect(tree).toHaveLength(2);
    
    const rootLocation = tree.find(node => node.id === 'location1');
    const standaloneComponent = tree.find(node => node.id === 'component2');
    
    expect(rootLocation).toBeDefined();
    expect(rootLocation?.type).toBe('location');
    expect(rootLocation?.children).toHaveLength(1);
    
    expect(standaloneComponent).toBeDefined();
    expect(standaloneComponent?.type).toBe('component');
    expect(standaloneComponent?.children).toHaveLength(0);
  });

  it('should correctly set levels for nested nodes', () => {
    const tree = buildTree(mockLocations, mockAssets);
    
    const rootLocation = tree.find(node => node.id === 'location1');
    const storageLocation = rootLocation?.children[0];
    const conveyorBelt = storageLocation?.children[0];
    const motorAssembly = conveyorBelt?.children[0];
    
    expect(rootLocation?.level).toBe(0);
    expect(storageLocation?.level).toBe(1);
    expect(conveyorBelt?.level).toBe(2);
    expect(motorAssembly?.level).toBe(3);
  });

  it('should handle empty input arrays', () => {
    const tree = buildTree([], []);
    expect(tree).toHaveLength(0);
  });

  it('should correctly set component properties', () => {
    const tree = buildTree(mockLocations, mockAssets);
    
    const component = tree.find(node => node.id === 'component2') as ComponentNode;
    
    expect(component).toBeDefined();
    expect(component.type).toBe('component');
    expect(component).toMatchObject({
      sensorId: 'TEMP002',
      sensorType: 'vibration',
      status: 'alert',
      gatewayId: 'GW002'
    });
  });

  it('should set hasChildren property correctly', () => {
    const tree = buildTree(mockLocations, mockAssets);
    
    const rootLocation = tree.find(node => node.id === 'location1');
    const component = tree.find(node => node.id === 'component2');
    
    expect(rootLocation?.hasChildren).toBe(true);
    expect(component?.hasChildren).toBe(false);
  });
});