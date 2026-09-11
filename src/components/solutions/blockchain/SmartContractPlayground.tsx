"use client";

import React, { useState } from "react";
import { Check, Copy, Play, Save, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";

const DEFAULT_SOLIDITY_CODE = `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SimpleToken {
    string public name;
    string public symbol;
    uint256 public totalSupply;
    mapping(address => uint256) public balanceOf;
    
    event Transfer(address indexed from, address indexed to, uint256 value);
    
    constructor(string memory _name, string memory _symbol, uint256 _totalSupply) {
        name = _name;
        symbol = _symbol;
        totalSupply = _totalSupply;
        balanceOf[msg.sender] = _totalSupply;
    }
    
    function transfer(address to, uint256 amount) external returns (bool) {
        require(balanceOf[msg.sender] >= amount, "Insufficient balance");
        
        balanceOf[msg.sender] -= amount;
        balanceOf[to] += amount;
        
        emit Transfer(msg.sender, to, amount);
        return true;
    }
}`;

const DEFAULT_TEST_CODE = `const SimpleToken = artifacts.require("SimpleToken");

contract("SimpleToken", (accounts) => {
  let tokenInstance;
  const owner = accounts[0];
  const recipient = accounts[1];
  
  before(async () => {
    tokenInstance = await SimpleToken.new("Test Token", "TEST", 1000000);
  });
  
  it("should initialize with correct values", async () => {
    const name = await tokenInstance.name();
    const symbol = await tokenInstance.symbol();
    const totalSupply = await tokenInstance.totalSupply();
    
    assert.equal(name, "Test Token", "Name is correct");
    assert.equal(symbol, "TEST", "Symbol is correct");
    assert.equal(totalSupply, 1000000, "Total supply is correct");
  });
  
  it("should transfer tokens correctly", async () => {
    await tokenInstance.transfer(recipient, 100, { from: owner });
    
    const recipientBalance = await tokenInstance.balanceOf(recipient);
    assert.equal(recipientBalance, 100, "Recipient balance is correct");
    
    const ownerBalance = await tokenInstance.balanceOf(owner);
    assert.equal(ownerBalance, 999900, "Owner balance is correct");
  });
});`;

interface CompilationResult {
    success: boolean;
    message: string;
    gasEstimate?: number;
    bytecode?: string;
}

interface TestResult {
    success: boolean;
    results: {
        name: string;
        passed: boolean;
        message?: string;
    }[];
}

export function SmartContractPlayground() {
    const [contractCode, setContractCode] = useState(DEFAULT_SOLIDITY_CODE);
    const [testCode, setTestCode] = useState(DEFAULT_TEST_CODE);
    const [activeTab, setActiveTab] = useState("editor");
    const [network, setNetwork] = useState("local");
    const [compilationResult, setCompilationResult] = useState<CompilationResult | null>(null);
    const [testResult, setTestResult] = useState<TestResult | null>(null);
    const [deploymentStatus, setDeploymentStatus] = useState<"idle" | "deploying" | "deployed" | "failed">("idle");
    const [contractAddress, setContractAddress] = useState<string | null>(null);
    const [copied, setCopied] = useState(false);

    const compileContract = () => {
        // Simulated compilation process
        setTimeout(() => {
            if (contractCode.includes("error") || contractCode.length < 50) {
                setCompilationResult({
                    success: false,
                    message: "Compilation failed: Contract code has errors or is incomplete",
                });
            } else {
                setCompilationResult({
                    success: true,
                    message: "Compilation successful!",
                    gasEstimate: Math.floor(Math.random() * 1000000) + 500000,
                    bytecode: "0x" + Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join(""),
                });
            }
        }, 1000);
    };

    const runTests = () => {
        // Simulated test running
        setTimeout(() => {
            if (testCode.includes("error")) {
                setTestResult({
                    success: false,
                    results: [
                        { name: "Test execution", passed: false, message: "Test code has errors" }
                    ]
                });
            } else {
                setTestResult({
                    success: true,
                    results: [
                        { name: "should initialize with correct values", passed: true },
                        { name: "should transfer tokens correctly", passed: true },
                    ]
                });
            }
        }, 1500);
    };

    const deployContract = () => {
        if (!compilationResult?.success) {
            alert("Please compile the contract successfully before deploying");
            return;
        }

        setDeploymentStatus("deploying");

        // Simulated deployment process
        setTimeout(() => {
            if (network === "mainnet") {
                setDeploymentStatus("failed");
                alert("Mainnet deployment requires real ETH. This is a simulation.");
            } else {
                setDeploymentStatus("deployed");
                setContractAddress("0x" + Array.from({ length: 40 }, () => Math.floor(Math.random() * 16).toString(16)).join(""));
            }
        }, 2000);
    };

    const copyAddress = () => {
        if (contractAddress) {
            navigator.clipboard.writeText(contractAddress);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    return (
        <div className="w-full space-y-4 text-foreground">
            <Card className="bg-gray-950/50 border-gray-800">
                <CardHeader>
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div>
                            <CardTitle>Smart Contract Playground</CardTitle>
                            <CardDescription>Build, test, and deploy smart contracts in a sandbox environment</CardDescription>
                        </div>
                        <div className="flex items-center gap-2">
                            <Select value={network} onValueChange={setNetwork}>
                                <SelectTrigger className="w-[180px] bg-slate-900 border-slate-700">
                                    <SelectValue placeholder="Select Network" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="local">Local Development</SelectItem>
                                    <SelectItem value="testnet">Ethereum Testnet</SelectItem>
                                    <SelectItem value="polygon">Polygon Testnet</SelectItem>
                                    <SelectItem value="mainnet">Ethereum Mainnet</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                        <TabsList className="grid grid-cols-3 mb-4 bg-slate-900">
                            <TabsTrigger value="editor">Contract Editor</TabsTrigger>
                            <TabsTrigger value="tests">Test Suite</TabsTrigger>
                            <TabsTrigger value="deployment">Deployment</TabsTrigger>
                        </TabsList>

                        <TabsContent value="editor" className="space-y-4">
                            <div className="relative">
                                <ScrollArea className="h-[400px] w-full rounded-md border border-slate-700 bg-slate-950">
                                    <textarea
                                        value={contractCode}
                                        onChange={(e) => setContractCode(e.target.value)}
                                        className="w-full h-full p-4 font-mono text-sm resize-none outline-none bg-transparent text-slate-300"
                                        spellCheck="false"
                                    />
                                </ScrollArea>
                            </div>
                            <div className="flex justify-end space-x-2">
                                <Button onClick={compileContract} className="flex items-center gap-2">
                                    <Play className="h-4 w-4" />
                                    Compile Contract
                                </Button>
                            </div>

                            {compilationResult && (
                                <div className={`p-4 mt-4 rounded-md ${compilationResult.success ? 'bg-green-950/20 border border-green-900' : 'bg-red-950/20 border border-red-900'}`}>
                                    <div className="flex items-start">
                                        {compilationResult.success ? (
                                            <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                                        ) : (
                                            <X className="h-5 w-5 text-red-500 mr-2 mt-0.5" />
                                        )}
                                        <div>
                                            <p className={`font-medium ${compilationResult.success ? 'text-green-400' : 'text-red-400'}`}>
                                                {compilationResult.message}
                                            </p>
                                            {compilationResult.success && (
                                                <div className="mt-2 text-sm text-slate-400">
                                                    <p>Gas Estimate: <span className="font-mono text-slate-200">{compilationResult.gasEstimate?.toLocaleString()}</span></p>
                                                    <p className="mt-1">Bytecode: <span className="font-mono text-xs text-slate-500">{compilationResult.bytecode?.substring(0, 20)}...</span></p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </TabsContent>

                        <TabsContent value="tests" className="space-y-4">
                            <div className="relative">
                                <ScrollArea className="h-[400px] w-full rounded-md border border-slate-700 bg-slate-950">
                                    <textarea
                                        value={testCode}
                                        onChange={(e) => setTestCode(e.target.value)}
                                        className="w-full h-full p-4 font-mono text-sm resize-none outline-none bg-transparent text-slate-300"
                                        spellCheck="false"
                                    />
                                </ScrollArea>
                            </div>
                            <div className="flex justify-end space-x-2">
                                <Button onClick={runTests} className="flex items-center gap-2">
                                    <Play className="h-4 w-4" />
                                    Run Tests
                                </Button>
                            </div>

                            {testResult && (
                                <div className={`p-4 mt-4 rounded-md ${testResult.success ? 'bg-green-950/20 border border-green-900' : 'bg-red-950/20 border border-red-900'}`}>
                                    <div className="flex items-start">
                                        {testResult.success ? (
                                            <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                                        ) : (
                                            <X className="h-5 w-5 text-red-500 mr-2 mt-0.5" />
                                        )}
                                        <div className="w-full">
                                            <p className={`font-medium ${testResult.success ? 'text-green-400' : 'text-red-400'}`}>
                                                {testResult.success ? 'All tests passed!' : 'Tests failed'}
                                            </p>
                                            <div className="mt-2 space-y-2">
                                                {testResult.results.map((result, idx) => (
                                                    <div key={idx} className="flex items-center justify-between">
                                                        <span className="text-sm text-slate-300">
                                                            {result.passed ? (
                                                                <Check className="h-4 w-4 text-green-500 inline mr-2" />
                                                            ) : (
                                                                <X className="h-4 w-4 text-red-500 inline mr-2" />
                                                            )}
                                                            {result.name}
                                                        </span>
                                                        <Badge variant={result.passed ? "default" : "destructive"} className={result.passed ? "bg-green-900/50 text-green-400 hover:bg-green-900/50" : "bg-red-900/50 text-red-400 hover:bg-red-900/50"}>
                                                            {result.passed ? "PASS" : "FAIL"}
                                                        </Badge>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </TabsContent>

                        <TabsContent value="deployment" className="space-y-4">
                            <div className="p-4 rounded-md border border-slate-700 bg-slate-900/50">
                                <h3 className="font-medium mb-2 text-slate-200">Deployment Settings</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-sm text-slate-500 mb-1">Network</p>
                                        <p className="font-medium text-slate-300">{network === 'local' ? 'Local Development' : network === 'testnet' ? 'Ethereum Testnet' : network === 'polygon' ? 'Polygon Testnet' : 'Ethereum Mainnet'}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-slate-500 mb-1">Estimated Gas</p>
                                        <p className="font-medium text-slate-300">{compilationResult?.gasEstimate?.toLocaleString() || 'Unknown'}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-slate-500 mb-1">Constructor Arguments</p>
                                        <p className="font-medium text-slate-300">["Test Token", "TEST", 1000000]</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-slate-500 mb-1">Compiler Version</p>
                                        <p className="font-medium text-slate-300">0.8.17</p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-end space-x-2">
                                <Button
                                    onClick={deployContract}
                                    disabled={deploymentStatus === "deploying" || !compilationResult?.success}
                                    className="flex items-center gap-2"
                                >
                                    {deploymentStatus === "deploying" ? "Deploying..." : "Deploy Contract"}
                                </Button>
                            </div>

                            {deploymentStatus === "deployed" && contractAddress && (
                                <div className="p-4 mt-4 rounded-md bg-green-950/20 border border-green-900">
                                    <div className="flex items-start">
                                        <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                                        <div className="w-full">
                                            <p className="font-medium text-green-400">
                                                Contract deployed successfully!
                                            </p>
                                            <div className="mt-2 flex justify-between items-center">
                                                <div>
                                                    <p className="text-sm text-slate-500">Contract Address:</p>
                                                    <p className="font-mono text-sm text-slate-300">{contractAddress}</p>
                                                </div>
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={copyAddress}
                                                    className="flex items-center gap-1 border-slate-700 hover:bg-slate-800"
                                                >
                                                    {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                                                    {copied ? "Copied" : "Copy"}
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {deploymentStatus === "failed" && (
                                <div className="p-4 mt-4 rounded-md bg-red-950/20 border border-red-900">
                                    <div className="flex items-start">
                                        <X className="h-5 w-5 text-red-500 mr-2 mt-0.5" />
                                        <div>
                                            <p className="font-medium text-red-400">
                                                Deployment failed
                                            </p>
                                            <p className="text-sm text-red-300 mt-1">
                                                Mainnet deployment requires real ETH. This is a simulation environment.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </TabsContent>
                    </Tabs>
                </CardContent>
                <CardFooter className="flex justify-between text-sm text-slate-500">
                    <p>Changes are saved automatically</p>
                    <Button variant="ghost" size="sm" className="flex items-center gap-1 hover:text-slate-300">
                        <Save className="h-4 w-4" />
                        Save as Template
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
}
