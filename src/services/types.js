export default function transform_fenode_be_node(catalog,position,type)
{
    const backend_data = {};
    backend_data.posX = position.x;
    backend_data.posY = position.y;
    backend_data.resourceCatalogID = catalog.uuid;
    backend_data.type = type;
    backend_data.name = catalog.name;
    const newNode = {
        id: 12345,
        name: catalog.name,
        type,
        position,
        style: { background: '#fff', border: '1px solid black', borderRadius: 15, fontSize: 12 },
        data: { label: `${backend_data.name}`, backend_data }, // Pass backend_data as part of the data
    };
    console.log(newNode);
    return newNode;
}