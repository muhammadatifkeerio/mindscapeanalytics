"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import {
    Play,
    Pause,
    Plus,
    Minus,
    RefreshCw,
    ChevronDown,
    Filter,
    Layers,
    Network,
    Cpu,
    Search
} from "lucide-react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";

// Types for our blockchain data
interface Node {
    id: string;
    type: 'miner' | 'validator' | 'light' | 'full';
    status: 'active' | 'inactive' | 'syncing';
    connections: string[];
    location: { x: number; y: number };
    performance: number;
}

interface Transaction {
    id: string;
    from: string;
    to: string;
    value: number;
    status: 'pending' | 'confirmed' | 'failed';
    timestamp: number;
    gas: number;
}

interface Block {
    id: string;
    hash: string;
    prevHash: string;
    transactions: string[];
    timestamp: number;
    miner: string;
    size: number;
}

export function BlockchainVisualizer() {
    // State for view mode and tabs
    const [viewMode, setViewMode] = useState<'network' | 'blocks'>('network');

    // State for simulation controls
    const [simulationSpeed, setSimulationSpeed] = useState<number>(50);
    const [isPlaying, setIsPlaying] = useState<boolean>(true);
    const [filterStatus, setFilterStatus] = useState<Record<string, boolean>>({
        active: true,
        inactive: false,
        syncing: true,
        pending: true,
        confirmed: true,
        failed: false,
    });
    const [zoomLevel, setZoomLevel] = useState<number>(100);

    // Canvas ref for drawing
    const canvasRef = useRef<HTMLCanvasElement>(null);

    // Sample data (would come from API in real app)
    const [nodes, setNodes] = useState<Node[]>([
        {
            id: 'node1',
            type: 'miner',
            status: 'active',
            connections: ['node2', 'node4', 'node5'],
            location: { x: 200, y: 150 },
            performance: 95
        },
        {
            id: 'node2',
            type: 'validator',
            status: 'active',
            connections: ['node1', 'node3', 'node6'],
            location: { x: 350, y: 100 },
            performance: 88
        },
        {
            id: 'node3',
            type: 'full',
            status: 'syncing',
            connections: ['node2', 'node7'],
            location: { x: 450, y: 200 },
            performance: 72
        },
        {
            id: 'node4',
            type: 'light',
            status: 'inactive',
            connections: ['node1'],
            location: { x: 150, y: 250 },
            performance: 45
        },
        {
            id: 'node5',
            type: 'miner',
            status: 'active',
            connections: ['node1', 'node6', 'node7'],
            location: { x: 300, y: 300 },
            performance: 91
        },
        {
            id: 'node6',
            type: 'validator',
            status: 'active',
            connections: ['node2', 'node5'],
            location: { x: 450, y: 350 },
            performance: 82
        },
        {
            id: 'node7',
            type: 'full',
            status: 'syncing',
            connections: ['node3', 'node5'],
            location: { x: 550, y: 270 },
            performance: 76
        },
    ]);

    const [transactions, setTransactions] = useState<Transaction[]>([
        {
            id: 'tx1',
            from: 'node1',
            to: 'node2',
            value: 0.45,
            status: 'confirmed',
            timestamp: Date.now() - 10000,
            gas: 21000
        },
        {
            id: 'tx2',
            from: 'node5',
            to: 'node3',
            value: 1.2,
            status: 'pending',
            timestamp: Date.now() - 5000,
            gas: 32000
        },
        {
            id: 'tx3',
            from: 'node2',
            to: 'node6',
            value: 0.08,
            status: 'failed',
            timestamp: Date.now() - 20000,
            gas: 18000
        },
        {
            id: 'tx4',
            from: 'node7',
            to: 'node4',
            value: 2.5,
            status: 'pending',
            timestamp: Date.now() - 2000,
            gas: 25000
        },
    ]);

    const [blocks, setBlocks] = useState<Block[]>([
        {
            id: 'block1',
            hash: '0xa1b2c3...',
            prevHash: '0x000000...',
            transactions: ['tx1'],
            timestamp: Date.now() - 60000,
            miner: 'node1',
            size: 1.2
        },
        {
            id: 'block2',
            hash: '0xd4e5f6...',
            prevHash: '0xa1b2c3...',
            transactions: [],
            timestamp: Date.now() - 45000,
            miner: 'node5',
            size: 0.8
        },
        {
            id: 'block3',
            hash: '0xg7h8i9...',
            prevHash: '0xd4e5f6...',
            transactions: ['tx3'],
            timestamp: Date.now() - 30000,
            miner: 'node2',
            size: 1.5
        },
    ]);

    // Handler functions
    const handlePlayPause = () => setIsPlaying(!isPlaying);
    const handleSpeedChange = (value: number[]) => setSimulationSpeed(value[0]);
    const handleZoomChange = (value: number[]) => setZoomLevel(value[0]);

    const handleRefreshData = () => {
        // In a real app, this would fetch fresh data from an API
        // For now, we'll just slightly modify existing data
        setNodes(prev => prev.map(node => ({
            ...node,
            performance: Math.min(100, Math.max(10, node.performance + (Math.random() * 10 - 5))),
            status: Math.random() > 0.8
                ? ['active', 'inactive', 'syncing'][Math.floor(Math.random() * 3)] as Node['status']
                : node.status
        })));

        // Add a new transaction
        const newTx: Transaction = {
            id: `tx${transactions.length + 1}`,
            from: nodes[Math.floor(Math.random() * nodes.length)].id,
            to: nodes[Math.floor(Math.random() * nodes.length)].id,
            value: parseFloat((Math.random() * 5).toFixed(2)),
            status: ['pending', 'confirmed', 'failed'][Math.floor(Math.random() * 3)] as Transaction['status'],
            timestamp: Date.now(),
            gas: Math.floor(15000 + Math.random() * 20000)
        };

        setTransactions(prev => [...prev, newTx]);
    };

    const toggleFilterStatus = (status: string) => {
        setFilterStatus(prev => ({
            ...prev,
            [status]: !prev[status]
        }));
    };

    // Helper functions for determining colors
    const getNodeColor = (node: Node) => {
        const typeColors = {
            miner: '#FF5733',
            validator: '#33A1FF',
            light: '#33FF57',
            full: '#D133FF'
        };
        return typeColors[node.type];
    };

    const getNodeStatusBackground = (node: Node) => {
        const statusBackgrounds = {
            active: 'rgba(0, 255, 0, 0.1)',
            inactive: 'rgba(255, 0, 0, 0.1)',
            syncing: 'rgba(255, 255, 0, 0.1)'
        };
        return statusBackgrounds[node.status];
    };

    const getTransactionColor = (tx: Transaction) => {
        const statusColors = {
            pending: '#FFC107',
            confirmed: '#4CAF50',
            failed: '#F44336'
        };
        return statusColors[tx.status];
    };

    // Animation and rendering
    useEffect(() => {
        if (!canvasRef.current || !isPlaying) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Set canvas dimensions to match its display size
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;

        // Scale based on zoom level
        const scale = zoomLevel / 100;

        // Animation variables
        let animationFrameId: number;
        let lastTimestamp = 0;

        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw function
        const draw = (timestamp: number) => {
            // Determine elapsed time and whether to update based on simulation speed
            const elapsed = timestamp - lastTimestamp;
            const shouldUpdate = elapsed > (100 - simulationSpeed) * 5;

            if (shouldUpdate) {
                lastTimestamp = timestamp;

                // Clear canvas
                ctx.clearRect(0, 0, canvas.width, canvas.height);

                // Draw connections
                ctx.lineWidth = 1;
                ctx.strokeStyle = '#ccc';

                nodes.forEach(node => {
                    if (!filterStatus[node.status]) return;

                    node.connections.forEach(connId => {
                        const connNode = nodes.find(n => n.id === connId);
                        if (connNode && filterStatus[connNode.status]) {
                            ctx.beginPath();
                            ctx.moveTo(node.location.x * scale, node.location.y * scale);
                            ctx.lineTo(connNode.location.x * scale, connNode.location.y * scale);
                            ctx.stroke();
                        }
                    });
                });

                // Draw nodes
                nodes.forEach(node => {
                    if (!filterStatus[node.status]) return;

                    const radius = node.type === 'miner' ? 15 : 12;

                    // Node shadow
                    ctx.beginPath();
                    ctx.arc(node.location.x * scale, node.location.y * scale, radius + 2, 0, 2 * Math.PI);
                    ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
                    ctx.fill();

                    // Node background
                    ctx.beginPath();
                    ctx.arc(node.location.x * scale, node.location.y * scale, radius, 0, 2 * Math.PI);
                    ctx.fillStyle = getNodeStatusBackground(node);
                    ctx.fill();

                    // Node border
                    ctx.beginPath();
                    ctx.arc(node.location.x * scale, node.location.y * scale, radius, 0, 2 * Math.PI);
                    ctx.strokeStyle = getNodeColor(node);
                    ctx.lineWidth = 2;
                    ctx.stroke();

                    // Node label
                    ctx.fillStyle = '#333';
                    ctx.font = '10px Arial';
                    ctx.textAlign = 'center';
                    ctx.fillText(node.id, node.location.x * scale, (node.location.y + radius + 10) * scale);
                });

                // Draw active transactions
                transactions.forEach(tx => {
                    if (!filterStatus[tx.status]) return;

                    const fromNode = nodes.find(n => n.id === tx.from);
                    const toNode = nodes.find(n => n.id === tx.to);

                    if (fromNode && toNode && filterStatus[fromNode.status] && filterStatus[toNode.status]) {
                        // Calculate position based on timestamp
                        const progress = Math.min(1, (Date.now() - tx.timestamp) / 15000);
                        const x = fromNode.location.x + (toNode.location.x - fromNode.location.x) * progress;
                        const y = fromNode.location.y + (toNode.location.y - fromNode.location.y) * progress;

                        // Transaction dot
                        ctx.beginPath();
                        ctx.arc(x * scale, y * scale, 5, 0, 2 * Math.PI);
                        ctx.fillStyle = getTransactionColor(tx);
                        ctx.fill();

                        // Value label for larger transactions
                        if (tx.value > 1) {
                            ctx.fillStyle = '#333';
                            ctx.font = '9px Arial';
                            ctx.textAlign = 'center';
                            ctx.fillText(`${tx.value} ETH`, x * scale, (y - 8) * scale);
                        }
                    }
                });
            }

            // Continue animation loop
            animationFrameId = requestAnimationFrame(draw);
        };

        // Start animation loop
        animationFrameId = requestAnimationFrame(draw);

        // Cleanup
        return () => {
            cancelAnimationFrame(animationFrameId);
        };
    }, [nodes, transactions, isPlaying, simulationSpeed, zoomLevel, filterStatus]);

    return (
        <div className="space-y-6 text-foreground w-full">
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="text-2xl font-bold">Blockchain Visualizer</h3>
                    <p className="text-muted-foreground">
                        Interactive visualization of blockchain network, transactions, and blocks
                    </p>
                </div>

                <div className="flex space-x-2">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="sm">
                                <Filter className="mr-2 h-4 w-4" />
                                Filters
                                <ChevronDown className="ml-2 h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-56">
                            <div className="p-2">
                                <h4 className="mb-2 font-medium">Node Status</h4>
                                <div className="space-y-2">
                                    {(['active', 'inactive', 'syncing'] as const).map(status => (
                                        <div key={status} className="flex items-center justify-between">
                                            <div className="flex items-center">
                                                <div className={`h-3 w-3 rounded-full mr-2 ${status === 'active' ? 'bg-green-500' :
                                                        status === 'inactive' ? 'bg-red-500' : 'bg-yellow-500'
                                                    }`} />
                                                <span className="capitalize">{status}</span>
                                            </div>
                                            <Switch
                                                checked={filterStatus[status]}
                                                onCheckedChange={() => toggleFilterStatus(status)}
                                            />
                                        </div>
                                    ))}
                                </div>

                                <h4 className="mt-4 mb-2 font-medium">Transaction Status</h4>
                                <div className="space-y-2">
                                    {(['pending', 'confirmed', 'failed'] as const).map(status => (
                                        <div key={status} className="flex items-center justify-between">
                                            <div className="flex items-center">
                                                <div className={`h-3 w-3 rounded-full mr-2 ${status === 'pending' ? 'bg-yellow-500' :
                                                        status === 'confirmed' ? 'bg-green-500' : 'bg-red-500'
                                                    }`} />
                                                <span className="capitalize">{status}</span>
                                            </div>
                                            <Switch
                                                checked={filterStatus[status]}
                                                onCheckedChange={() => toggleFilterStatus(status)}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    <Button
                        variant="outline"
                        size="sm"
                        onClick={handleRefreshData}
                    >
                        <RefreshCw className="mr-2 h-4 w-4" />
                        Refresh Data
                    </Button>

                    <div className="flex border rounded-md">
                        <Button
                            variant="ghost"
                            size="sm"
                            className={viewMode === 'network' ? 'bg-muted' : ''}
                            onClick={() => setViewMode('network')}
                        >
                            <Network className="h-4 w-4" />
                        </Button>
                        <Button
                            variant="ghost"
                            size="sm"
                            className={viewMode === 'blocks' ? 'bg-muted' : ''}
                            onClick={() => setViewMode('blocks')}
                        >
                            <Layers className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card className="col-span-1 md:col-span-3 bg-gray-950/50 border-gray-800">
                    <CardHeader className="pb-2">
                        <CardTitle>
                            {viewMode === 'network' ? 'Network Visualization' : 'Blockchain Explorer'}
                        </CardTitle>
                        <CardDescription>
                            {viewMode === 'network'
                                ? 'Live view of nodes and transactions in the network'
                                : 'Chronological view of blocks and included transactions'}
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="p-4">
                        <div className="relative border border-gray-800 rounded-md overflow-hidden bg-slate-950" style={{ height: '500px' }}>
                            {viewMode === 'network' ? (
                                <>
                                    <canvas ref={canvasRef} className="w-full h-full" />

                                    <div className="absolute bottom-4 left-4 bg-background/90 p-2 rounded-md border border-gray-800 flex flex-col space-y-2 w-48 backdrop-blur-sm">
                                        <div className="flex items-center justify-between">
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={handlePlayPause}
                                                className="px-2"
                                            >
                                                {isPlaying ? (
                                                    <Pause className="h-4 w-4" />
                                                ) : (
                                                    <Play className="h-4 w-4" />
                                                )}
                                            </Button>
                                            <span className="text-xs text-muted-foreground">
                                                Speed: {simulationSpeed}%
                                            </span>
                                        </div>

                                        <Slider
                                            defaultValue={[simulationSpeed]}
                                            max={100}
                                            min={10}
                                            step={5}
                                            onValueChange={handleSpeedChange}
                                        />

                                        <div className="flex items-center justify-between mt-2">
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="px-2"
                                                onClick={() => setZoomLevel(Math.max(50, zoomLevel - 10))}
                                            >
                                                <Minus className="h-3 w-3" />
                                            </Button>
                                            <span className="text-xs text-muted-foreground">
                                                Zoom: {zoomLevel}%
                                            </span>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="px-2"
                                                onClick={() => setZoomLevel(Math.min(200, zoomLevel + 10))}
                                            >
                                                <Plus className="h-3 w-3" />
                                            </Button>
                                        </div>

                                        <Slider
                                            defaultValue={[zoomLevel]}
                                            max={200}
                                            min={50}
                                            step={5}
                                            onValueChange={handleZoomChange}
                                        />
                                    </div>

                                    <div className="absolute top-4 right-4 bg-background/90 p-2 rounded-md border border-gray-800 backdrop-blur-sm">
                                        <div className="text-xs font-medium mb-1">Node Types</div>
                                        <div className="flex flex-col space-y-1">
                                            <div className="flex items-center text-xs">
                                                <div className="h-3 w-3 rounded-full mr-2" style={{ backgroundColor: '#FF5733' }} />
                                                <span>Miner</span>
                                            </div>
                                            <div className="flex items-center text-xs">
                                                <div className="h-3 w-3 rounded-full mr-2" style={{ backgroundColor: '#33A1FF' }} />
                                                <span>Validator</span>
                                            </div>
                                            <div className="flex items-center text-xs">
                                                <div className="h-3 w-3 rounded-full mr-2" style={{ backgroundColor: '#33FF57' }} />
                                                <span>Light Node</span>
                                            </div>
                                            <div className="flex items-center text-xs">
                                                <div className="h-3 w-3 rounded-full mr-2" style={{ backgroundColor: '#D133FF' }} />
                                                <span>Full Node</span>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <div className="p-4 space-y-4 overflow-auto h-full text-foreground">
                                    <div className="flex items-center gap-2 mb-4">
                                        <Input
                                            placeholder="Search by block hash, transaction ID..."
                                            className="w-full bg-slate-900 border-slate-700"
                                        />
                                        <Button variant="outline" size="icon">
                                            <Search className="h-4 w-4" />
                                        </Button>
                                    </div>

                                    <div className="space-y-4">
                                        {blocks.map((block, index) => (
                                            <motion.div
                                                key={block.id}
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: index * 0.1 }}
                                                className="border border-slate-700 rounded-md p-3 bg-slate-900"
                                            >
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center">
                                                        <div className="bg-primary/10 p-2 rounded mr-3">
                                                            <Cpu className="h-5 w-5 text-primary" />
                                                        </div>
                                                        <div>
                                                            <div className="flex items-center gap-2">
                                                                <h4 className="font-medium">Block #{blocks.length - index}</h4>
                                                                <Badge variant="outline" className="text-xs border-slate-600">
                                                                    {new Date(block.timestamp).toLocaleTimeString()}
                                                                </Badge>
                                                            </div>
                                                            <p className="text-xs text-muted-foreground truncate" style={{ maxWidth: '300px' }}>
                                                                Hash: {block.hash}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className="text-right">
                                                        <div className="text-sm">
                                                            {block.transactions.length} transactions
                                                        </div>
                                                        <div className="text-xs text-muted-foreground">
                                                            {block.size} MB
                                                        </div>
                                                    </div>
                                                </div>

                                                {block.transactions.length > 0 && (
                                                    <div className="mt-2 pt-2 border-t border-slate-700">
                                                        <div className="text-xs font-medium mb-1">Transactions:</div>
                                                        <div className="space-y-1">
                                                            {block.transactions.map(txId => {
                                                                const tx = transactions.find(t => t.id === txId);
                                                                return tx ? (
                                                                    <div key={tx.id} className="text-xs px-2 py-1 bg-slate-800 rounded flex justify-between">
                                                                        <span>{tx.from} → {tx.to}</span>
                                                                        <span className="font-medium">{tx.value} ETH</span>
                                                                    </div>
                                                                ) : null;
                                                            })}
                                                        </div>
                                                    </div>
                                                )}
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>

                <div className="space-y-4">
                    <Card className="bg-gray-950/50 border-gray-800">
                        <CardHeader className="pb-2">
                            <CardTitle>Statistics</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <dl className="space-y-2">
                                <div className="flex justify-between">
                                    <dt className="text-sm font-medium text-muted-foreground">Total Nodes</dt>
                                    <dd className="text-sm font-medium">{nodes.length}</dd>
                                </div>
                                <div className="flex justify-between">
                                    <dt className="text-sm font-medium text-muted-foreground">Active Nodes</dt>
                                    <dd className="text-sm font-medium">{nodes.filter(n => n.status === 'active').length}</dd>
                                </div>
                                <div className="flex justify-between">
                                    <dt className="text-sm font-medium text-muted-foreground">Transactions</dt>
                                    <dd className="text-sm font-medium">{transactions.length}</dd>
                                </div>
                                <div className="flex justify-between">
                                    <dt className="text-sm font-medium text-muted-foreground">Blocks</dt>
                                    <dd className="text-sm font-medium">{blocks.length}</dd>
                                </div>
                                <div className="flex justify-between">
                                    <dt className="text-sm font-medium text-muted-foreground">Latest Block</dt>
                                    <dd className="text-sm font-medium">{blocks[blocks.length - 1]?.hash.substring(0, 8)}...</dd>
                                </div>
                            </dl>
                        </CardContent>
                    </Card>

                    <Card className="bg-gray-950/50 border-gray-800">
                        <CardHeader className="pb-2">
                            <CardTitle>Network Health</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-2">
                                <div>
                                    <div className="flex justify-between text-sm mb-1">
                                        <span className="text-muted-foreground">Average Node Performance</span>
                                        <span className="font-medium">
                                            {Math.round(nodes.reduce((acc, node) => acc + node.performance, 0) / nodes.length)}%
                                        </span>
                                    </div>
                                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-primary rounded-full"
                                            style={{
                                                width: `${Math.round(nodes.reduce((acc, node) => acc + node.performance, 0) / nodes.length)}%`
                                            }}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <div className="flex justify-between text-sm mb-1">
                                        <span className="text-muted-foreground">Transaction Success Rate</span>
                                        <span className="font-medium">
                                            {Math.round(transactions.filter(tx => tx.status === 'confirmed').length / transactions.length * 100)}%
                                        </span>
                                    </div>
                                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-green-500 rounded-full"
                                            style={{
                                                width: `${Math.round(transactions.filter(tx => tx.status === 'confirmed').length / transactions.length * 100)}%`
                                            }}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <div className="flex justify-between text-sm mb-1">
                                        <span className="text-muted-foreground">Network Connectivity</span>
                                        <span className="font-medium">
                                            {Math.round(nodes.reduce((acc, node) => acc + node.connections.length, 0) / (nodes.length * 2) * 100)}%
                                        </span>
                                    </div>
                                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-blue-500 rounded-full"
                                            style={{
                                                width: `${Math.round(nodes.reduce((acc, node) => acc + node.connections.length, 0) / (nodes.length * 2) * 100)}%`
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
