---
title: "Daily Cumulative Fee System: Dynamic Incentives for a Fairer and More Efficient DeFi"
date: "2025-07-07"
description: "A technical exploration of progressive transaction fees based on daily cumulative volume in DeFi, designed to reduce network congestion, create fairer fee distribution, and incentivize users to spread activity throughout the day."
---

## The Problem: Fixed Fees Are Inefficient

Most payment systems, whether centralized (like Stripe or PayPal) or decentralized (like Uniswap or 1inch), rely on static fee structures. These fees are typically fixed percentages or scale linearly with transaction size, regardless of network context or user behavior.

This model fails to account for cumulative usage or time-based distribution. The result is a system that favors volume concentration and penalizes consistent, moderate usage.

In DeFi, this translates into:

* **Congestion during predictable peak hours**
* **Disproportionate costs for smaller users**
* **Increased MEV exposure**
* **Unpredictable user experience**

Static fees replicate the inefficiencies of the legacy financial system. They ignore the design space offered by smart contracts and the opportunity to align cost with behavior.

## The Solution: Volume-Based Daily Progressive Fees

The **Daily Cumulative Fee System** introduces progressive transaction fees based on the user’s cumulative daily volume. It resets automatically every 24 hours.

The goal is to:

* Incentivize users to spread activity throughout the day
* Discourage large-volume spikes that congest the network
* Create a more equitable fee distribution model

### A Simple Analogy

Think of it like a mobile data plan:

* Up to 10GB/day: full speed
* After 10GB: throttled
* At midnight: reset

This system applies the same logic to transaction volume and fees.

---

## Technical Implementation

### Progressive Fee Structure

Fees vary based on cumulative daily volume and mode of operation (core or advanced):

```solidity
uint256 public constant CORE_FEE_LOW = 300;         // 3%
uint256 public constant CORE_FEE_HIGH = 500;        // 5%
uint256 public constant ADVANCED_FEE_LOW = 500;     // 5%
uint256 public constant ADVANCED_FEE_HIGH = 700;    // 7%

uint256 public constant DAILY_USD_VOLUME_THRESHOLD = 10_000;     // USDT
uint256 public constant DAILY_ETH_VOLUME_THRESHOLD = 3 ether;    // ETH
```

---

### Storage Optimization

To make volume tracking efficient, we use packed structs:

```solidity
struct DailyVolumeData {
    uint128 volumeETH;
    uint32 lastUpdateDay;
    uint96 volumeUSDT;
}
```

This structure fits in a single 32-byte storage slot, reducing gas usage per write by \~20,000 compared to naive implementations.

---

### Stateless Daily Reset

Volume resets are computed deterministically using the Unix epoch:

```solidity
function getCurrentDay() public view returns (uint32) {
    return uint32(block.timestamp / 86400);
}

if (volumeData.lastUpdateDay != currentDay) {
    return 0; // Implicit reset
}
```

No external triggers, no gas spent on resets, and no need for off-chain orchestration.

---

### Real-Time Fee Calculation

The system dynamically adjusts the fee based on updated volume totals:

```solidity
function calculateDailyVolumeFee(
    address coreContract,
    address user,
    uint256 transactionAmount,
    bool isUSDT
) external view returns (uint256 feeBps, uint256 newDailyTotal)
```

The function computes whether the user is within the low-fee threshold or has crossed into the higher tier.

---

## Usage Examples

### Scenario 1: Small Trader

10 transactions of 1 ETH, spread across the day
→ Total: 10 ETH
→ All under threshold (3%)
→ Total fees: **0.3 ETH**

### Scenario 2: Whale

1 transaction of 10 ETH
→ Crosses threshold (5%)
→ Total fees: **0.5 ETH**

**Result:** Small trader pays 40% less.

---

### Built-In Simulation Tool

Users and integrators can simulate fee progression based on planned transactions:

```solidity
function simulateDailyFeeProgression(
    address coreContract,
    address user,
    uint256[] calldata transactions,
    bool isUSDT
) external view returns (
    uint256 totalFees,
    uint256[] memory feeBreakdown,
    uint256[] memory volumeProgression
)
```

This improves cost visibility and allows for optimal scheduling of transactions.

---

## Benefits

### 1. Reduced Network Congestion

Users have a financial incentive to avoid peak periods and distribute activity.

### 2. Fair Fee Distribution

Fees reflect behavioral patterns rather than just transaction size.

### 3. Lower MEV Attractiveness

Large bursts of volume trigger higher fees, reducing exploitable patterns.

### 4. Transparent UX

The system exposes current usage and fee tier boundaries:

```solidity
function getVolumeIncentiveInfo(...) external view returns (
    uint256 currentVolume,
    uint256 remainingLowFeeVolume,
    uint256 nextResetTime,
    uint256 lowFeeBps,
    uint256 highFeeBps
)
```

This allows users to plan transactions with full clarity.

---

## Additional Gas Optimizations

### Custom Errors

```solidity
error InsufficientDeploymentFee();
if (msg.value < deploymentFee) revert InsufficientDeploymentFee();
```

Saves \~46 gas compared to string-based errors.

---

### Unchecked Arithmetic (When Safe)

```solidity
unchecked {
    ++data.count;
}
```

Used only in verified contexts to avoid overflow checks, saving \~20 gas per operation.

---

### Efficient ETH Transfer Logic

```solidity
if (msg.value > 0) {
    (bool success,) = payable(factoryOwner).call{value: msg.value}("");
    if (!success) revert FeeTransferFailed();
}
```

Minimalist and resilient.

---

## Final Notes

The Daily Cumulative Fee System offers a practical alternative to fixed-fee models. It aligns network efficiency with user incentives through:

* Stateless time-based resets
* Progressive pricing based on behavior
* Lightweight and gas-efficient implementation
* Improved predictability and fairness

This mechanism is designed to scale with usage without requiring centralized intervention. It reflects a broader design philosophy: that economic logic, not arbitrary rules, should govern access and cost within decentralized systems.
