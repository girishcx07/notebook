"use client";

import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import { useIsMobile } from "@notebook/ui/hooks/use-mobile";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@notebook/ui/components/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@notebook/ui/components/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@notebook/ui/components/select";
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@notebook/ui/components/toggle-group";

export const description = "An interactive area chart";

const chartData = [
  { date: "2024-04-01", students: 222 },
  { date: "2024-04-02", students: 97 },
  { date: "2024-04-03", students: 167 },
  { date: "2024-04-04", students: 242 },
  { date: "2024-04-05", students: 373 },
  { date: "2024-04-06", students: 301 },
  { date: "2024-04-07", students: 245 },
  { date: "2024-04-08", students: 409 },
  { date: "2024-04-09", students: 59 },
  { date: "2024-04-10", students: 261 },
  { date: "2024-04-11", students: 327 },
  { date: "2024-04-12", students: 292 },
  { date: "2024-04-13", students: 342 },
  { date: "2024-04-14", students: 137 },
  { date: "2024-04-15", students: 120 },
  { date: "2024-04-16", students: 138 },
  { date: "2024-04-17", students: 446 },
  { date: "2024-04-18", students: 364 },
  { date: "2024-04-19", students: 243 },
  { date: "2024-04-20", students: 89 },
  { date: "2024-04-21", students: 137 },
  { date: "2024-04-22", students: 224 },
  { date: "2024-04-23", students: 138 },
  { date: "2024-04-24", students: 387 },
  { date: "2024-04-25", students: 215 },
  { date: "2024-04-26", students: 75 },
  { date: "2024-04-27", students: 383 },
  { date: "2024-04-28", students: 122 },
  { date: "2024-04-29", students: 315 },
  { date: "2024-04-30", students: 454 },
  { date: "2024-05-01", students: 165 },
  { date: "2024-05-02", students: 293 },
  { date: "2024-05-03", students: 247 },
  { date: "2024-05-04", students: 385 },
  { date: "2024-05-05", students: 481 },
  { date: "2024-05-06", students: 498 },
  { date: "2024-05-07", students: 388 },
  { date: "2024-05-08", students: 149 },
  { date: "2024-05-09", students: 227 },
  { date: "2024-05-10", students: 293 },
  { date: "2024-05-11", students: 335 },
  { date: "2024-05-12", students: 197 },
  { date: "2024-05-13", students: 197 },
  { date: "2024-05-14", students: 448 },
  { date: "2024-05-15", students: 473 },
  { date: "2024-05-16", students: 338 },
  { date: "2024-05-17", students: 499 },
  { date: "2024-05-18", students: 315 },
  { date: "2024-05-19", students: 235 },
  { date: "2024-05-20", students: 177 },
  { date: "2024-05-21", students: 82 },
  { date: "2024-05-22", students: 81 },
  { date: "2024-05-23", students: 252 },
  { date: "2024-05-24", students: 294 },
  { date: "2024-05-25", students: 201 },
  { date: "2024-05-26", students: 213 },
  { date: "2024-05-27", students: 420 },
  { date: "2024-05-28", students: 233 },
  { date: "2024-05-29", students: 78 },
  { date: "2024-05-30", students: 340 },
  { date: "2024-05-31", students: 178 },
  { date: "2024-06-01", students: 178 },
  { date: "2024-06-02", students: 470 },
  { date: "2024-06-03", students: 103 },
  { date: "2024-06-04", students: 439 },
  { date: "2024-06-05", students: 88 },
  { date: "2024-06-06", students: 294 },
  { date: "2024-06-07", students: 323 },
  { date: "2024-06-08", students: 385 },
  { date: "2024-06-09", students: 438 },
  { date: "2024-06-10", students: 155 },
  { date: "2024-06-11", students: 92 },
  { date: "2024-06-12", students: 492 },
  { date: "2024-06-13", students: 81 },
  { date: "2024-06-14", students: 426 },
  { date: "2024-06-15", students: 307 },
  { date: "2024-06-16", students: 371 },
  { date: "2024-06-17", students: 475 },
  { date: "2024-06-18", students: 107 },
  { date: "2024-06-19", students: 341 },
  { date: "2024-06-20", students: 408 },
  { date: "2024-06-21", students: 169 },
  { date: "2024-06-22", students: 317 },
  { date: "2024-06-23", students: 480 },
  { date: "2024-06-24", students: 132 },
  { date: "2024-06-25", students: 141 },
  { date: "2024-06-26", students: 434 },
  { date: "2024-06-27", students: 448 },
  { date: "2024-06-28", students: 149 },
  { date: "2024-06-29", students: 103 },
  { date: "2024-06-30", students: 446 },
];

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  desktop: {
    label: "Desktop",
    color: "var(--primary)",
  },
  mobile: {
    label: "Mobile",
    color: "var(--primary)",
  },
} satisfies ChartConfig;

export function ChartAreaInteractive() {
  const isMobile = useIsMobile();
  const [timeRange, setTimeRange] = React.useState("90d");

  React.useEffect(() => {
    if (isMobile) {
      setTimeRange("7d");
    }
  }, [isMobile]);

  const filteredData = chartData.filter((item) => {
    const date = new Date(item.date);
    const referenceDate = new Date("2024-06-30");
    let daysToSubtract = 90;
    if (timeRange === "30d") {
      daysToSubtract = 30;
    } else if (timeRange === "7d") {
      daysToSubtract = 7;
    }
    const startDate = new Date(referenceDate);
    startDate.setDate(startDate.getDate() - daysToSubtract);
    return date >= startDate;
  });

  return (
    <Card className="@container/card">
      <CardHeader>
        <CardTitle>Total Visitors</CardTitle>
        <CardDescription>
          <span className="hidden @[540px]/card:block">
            Total for the last 3 months
          </span>
          <span className="@[540px]/card:hidden">Last 3 months</span>
        </CardDescription>
        <CardAction>
          <ToggleGroup
            type="single"
            value={timeRange}
            onValueChange={setTimeRange}
            variant="outline"
            className="hidden *:data-[slot=toggle-group-item]:!px-4 @[767px]/card:flex"
          >
            <ToggleGroupItem value="90d">Last 3 months</ToggleGroupItem>
            <ToggleGroupItem value="30d">Last 30 days</ToggleGroupItem>
            <ToggleGroupItem value="7d">Last 7 days</ToggleGroupItem>
          </ToggleGroup>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger
              className="flex w-40 **:data-[slot=select-value]:block **:data-[slot=select-value]:truncate @[767px]/card:hidden"
              size="sm"
              aria-label="Select a value"
            >
              <SelectValue placeholder="Last 3 months" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="90d" className="rounded-lg">
                Last 3 months
              </SelectItem>
              <SelectItem value="30d" className="rounded-lg">
                Last 30 days
              </SelectItem>
              <SelectItem value="7d" className="rounded-lg">
                Last 7 days
              </SelectItem>
            </SelectContent>
          </Select>
        </CardAction>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-desktop)"
                  stopOpacity={1.0}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-desktop)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-mobile)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-mobile)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    });
                  }}
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="students"
              type="natural"
              fill="url(#fillMobile)"
              stroke="var(--color-mobile)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
