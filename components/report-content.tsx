"use client"
import { useState, useMemo } from "react"
import { Download, Filter, RefreshCw, BarChart2 } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { generateAllMissingEntries, getDataForDateRange, FormattedDailyData } from "@/lib/date-utils"

const baseReportData = {
  "Last 7 Days": {
    "All Countries": {
      "All Devices": [
        { date: "Jun 17, 2026", impressions: "0", clicks: "0", ctr: "0.00%", ecpm: "$0.00", revenue: "$0.00" },
        { date: "Jun 16, 2026", impressions: "0", clicks: "0", ctr: "0.00%", ecpm: "$0.00", revenue: "$0.00" },
        { date: "Jun 15, 2026", impressions: "0", clicks: "0", ctr: "0.00%", ecpm: "$0.00", revenue: "$0.00" },
        { date: "Jun 14, 2026", impressions: "432", clicks: "14", ctr: "3.24%", ecpm: "$61.77", revenue: "$0.89" },
        { date: "Jun 13, 2026", impressions: "342", clicks: "13", ctr: "3.80%", ecpm: "$59.88", revenue: "$0.32" },
        { date: "Jun 12, 2026", impressions: "6,871", clicks: "242", ctr: "3.52%", ecpm: "$66.98", revenue: "$23.01" },
        { date: "Jun 11, 2026", impressions: "6,730", clicks: "224", ctr: "3.33%", ecpm: "$61.44", revenue: "$22.45" },
      ],
      Desktop: [
        { date: "Jun 17, 2026", impressions: "0", clicks: "0", ctr: "0.00%", ecpm: "$0.00", revenue: "$0.00" },
        { date: "Jun 16, 2026", impressions: "0", clicks: "0", ctr: "0.00%", ecpm: "$0.00", revenue: "$0.00" },
        { date: "Jun 15, 2026", impressions: "0", clicks: "0", ctr: "0.00%", ecpm: "$0.00", revenue: "$0.00" },
        { date: "Jun 14, 2026", impressions: "259", clicks: "8", ctr: "3.24%", ecpm: "$61.77", revenue: "$0.53" },
        { date: "Jun 13, 2026", impressions: "205", clicks: "8", ctr: "3.80%", ecpm: "$59.88", revenue: "$0.19" },
        { date: "Jun 12, 2026", impressions: "4,123", clicks: "145", ctr: "3.52%", ecpm: "$66.98", revenue: "$13.81" },
        { date: "Jun 11, 2026", impressions: "4,038", clicks: "134", ctr: "3.33%", ecpm: "$61.44", revenue: "$13.47" },
      ],
      Mobile: [
        { date: "Jun 17, 2026", impressions: "0", clicks: "0", ctr: "0.00%", ecpm: "$0.00", revenue: "$0.00" },
        { date: "Jun 16, 2026", impressions: "0", clicks: "0", ctr: "0.00%", ecpm: "$0.00", revenue: "$0.00" },
        { date: "Jun 15, 2026", impressions: "0", clicks: "0", ctr: "0.00%", ecpm: "$0.00", revenue: "$0.00" },
        { date: "Jun 14, 2026", impressions: "173", clicks: "6", ctr: "3.24%", ecpm: "$61.77", revenue: "$0.36" },
        { date: "Jun 13, 2026", impressions: "137", clicks: "5", ctr: "3.80%", ecpm: "$59.88", revenue: "$0.13" },
        { date: "Jun 12, 2026", impressions: "2,748", clicks: "97", ctr: "3.52%", ecpm: "$66.98", revenue: "$9.20" },
        { date: "Jun 11, 2026", impressions: "2,692", clicks: "90", ctr: "3.33%", ecpm: "$61.44", revenue: "$8.98" },
      ],
    },
  },
  "Last 7 Days Full": {
    "All Countries": {
      "All Devices": [
        { date: "Jun 17, 2026", impressions: "0", clicks: "0", ctr: "0.00%", ecpm: "$0.00", revenue: "$0.00" },
        { date: "Jun 16, 2026", impressions: "0", clicks: "0", ctr: "0.00%", ecpm: "$0.00", revenue: "$0.00" },
        { date: "Jun 15, 2026", impressions: "0", clicks: "0", ctr: "0.00%", ecpm: "$0.00", revenue: "$0.00" },
        { date: "Jun 14, 2026", impressions: "432", clicks: "14", ctr: "3.24%", ecpm: "$61.77", revenue: "$0.89" },
        { date: "Jun 13, 2026", impressions: "342", clicks: "13", ctr: "3.80%", ecpm: "$59.88", revenue: "$0.32" },
        { date: "Jun 12, 2026", impressions: "6,871", clicks: "242", ctr: "3.52%", ecpm: "$66.98", revenue: "$23.01" },
        { date: "Jun 11, 2026", impressions: "6,730", clicks: "224", ctr: "3.33%", ecpm: "$61.44", revenue: "$22.45" },
      ],
      Desktop: [
        { date: "Jun 17, 2026", impressions: "0", clicks: "0", ctr: "0.00%", ecpm: "$0.00", revenue: "$0.00" },
        { date: "Jun 16, 2026", impressions: "0", clicks: "0", ctr: "0.00%", ecpm: "$0.00", revenue: "$0.00" },
        { date: "Jun 15, 2026", impressions: "0", clicks: "0", ctr: "0.00%", ecpm: "$0.00", revenue: "$0.00" },
        { date: "Jun 14, 2026", impressions: "259", clicks: "8", ctr: "3.24%", ecpm: "$61.77", revenue: "$0.53" },
        { date: "Jun 13, 2026", impressions: "205", clicks: "8", ctr: "3.80%", ecpm: "$59.88", revenue: "$0.19" },
        { date: "Jun 12, 2026", impressions: "4,123", clicks: "145", ctr: "3.52%", ecpm: "$66.98", revenue: "$13.81" },
        { date: "Jun 11, 2026", impressions: "4,038", clicks: "134", ctr: "3.33%", ecpm: "$61.44", revenue: "$13.47" },
      ],
      Mobile: [
        { date: "Jun 17, 2026", impressions: "0", clicks: "0", ctr: "0.00%", ecpm: "$0.00", revenue: "$0.00" },
        { date: "Jun 16, 2026", impressions: "0", clicks: "0", ctr: "0.00%", ecpm: "$0.00", revenue: "$0.00" },
        { date: "Jun 15, 2026", impressions: "0", clicks: "0", ctr: "0.00%", ecpm: "$0.00", revenue: "$0.00" },
        { date: "Jun 14, 2026", impressions: "173", clicks: "6", ctr: "3.24%", ecpm: "$61.77", revenue: "$0.36" },
        { date: "Jun 13, 2026", impressions: "137", clicks: "5", ctr: "3.80%", ecpm: "$59.88", revenue: "$0.13" },
        { date: "Jun 12, 2026", impressions: "2,748", clicks: "97", ctr: "3.52%", ecpm: "$66.98", revenue: "$9.20" },
        { date: "Jun 11, 2026", impressions: "2,692", clicks: "90", ctr: "3.33%", ecpm: "$61.44", revenue: "$8.98" },
      ],
    },
  },
  "Last 30 Days": {
    "All Countries": {
      "All Devices": [
        { date: "Jun 17, 2026", impressions: "0", clicks: "0", ctr: "0.00%", ecpm: "$0.00", revenue: "$0.00" },
        { date: "Jun 16, 2026", impressions: "0", clicks: "0", ctr: "0.00%", ecpm: "$0.00", revenue: "$0.00" },
        { date: "Jun 15, 2026", impressions: "0", clicks: "0", ctr: "0.00%", ecpm: "$0.00", revenue: "$0.00" },
        { date: "Jun 14, 2026", impressions: "432", clicks: "14", ctr: "3.24%", ecpm: "$61.77", revenue: "$0.89" },
        { date: "Jun 13, 2026", impressions: "342", clicks: "13", ctr: "3.80%", ecpm: "$59.88", revenue: "$0.32" },
        { date: "Jun 12, 2026", impressions: "6,871", clicks: "242", ctr: "3.52%", ecpm: "$66.98", revenue: "$23.01" },
        { date: "Jun 11, 2026", impressions: "6,730", clicks: "224", ctr: "3.33%", ecpm: "$61.44", revenue: "$22.45" },
        { date: "Jun 10, 2026", impressions: "6,654", clicks: "212", ctr: "3.19%", ecpm: "$57.98", revenue: "$21.99" },
        { date: "Jun 09, 2026", impressions: "6,783", clicks: "237", ctr: "3.50%", ecpm: "$65.33", revenue: "$22.90" },
        { date: "Jun 08, 2026", impressions: "6,760", clicks: "235", ctr: "3.48%", ecpm: "$64.10", revenue: "$22.55" },
        { date: "Jun 07, 2026", impressions: "6,730", clicks: "232", ctr: "3.45%", ecpm: "$62.44", revenue: "$22.20" },
        { date: "Jun 06, 2026", impressions: "6,701", clicks: "229", ctr: "3.42%", ecpm: "$61.33", revenue: "$21.90" },
        { date: "Jun 05, 2026", impressions: "6,670", clicks: "225", ctr: "3.37%", ecpm: "$60.55", revenue: "$21.61" },
        { date: "Jun 04, 2026", impressions: "6,642", clicks: "222", ctr: "3.34%", ecpm: "$59.88", revenue: "$21.33" },
        { date: "Jun 03, 2026", impressions: "6,618", clicks: "219", ctr: "3.31%", ecpm: "$59.12", revenue: "$21.05" },
        { date: "Jun 02, 2026", impressions: "6,592", clicks: "216", ctr: "3.27%", ecpm: "$58.44", revenue: "$20.73" },
        { date: "Jun 01, 2026", impressions: "6,568", clicks: "213", ctr: "3.24%", ecpm: "$57.66", revenue: "$20.42" },
        { date: "May 31, 2026", impressions: "6,543", clicks: "210", ctr: "3.21%", ecpm: "$56.77", revenue: "$20.11" },
        { date: "May 30, 2026", impressions: "6,975", clicks: "242", ctr: "3.47%", ecpm: "$65.00", revenue: "$24.40" },
        { date: "May 29, 2026", impressions: "6,958", clicks: "241", ctr: "3.46%", ecpm: "$64.55", revenue: "$24.25" },
        { date: "May 28, 2026", impressions: "6,938", clicks: "240", ctr: "3.46%", ecpm: "$64.00", revenue: "$24.10" },
        { date: "May 27, 2026", impressions: "6,910", clicks: "238", ctr: "3.44%", ecpm: "$63.55", revenue: "$23.88" },
        { date: "May 26, 2026", impressions: "6,881", clicks: "236", ctr: "3.43%", ecpm: "$63.00", revenue: "$23.66" },
        { date: "May 25, 2026", impressions: "6,850", clicks: "234", ctr: "3.41%", ecpm: "$62.48", revenue: "$23.40" },
        { date: "May 24, 2026", impressions: "6,822", clicks: "232", ctr: "3.40%", ecpm: "$62.02", revenue: "$23.15" },
        { date: "May 23, 2026", impressions: "6,790", clicks: "230", ctr: "3.39%", ecpm: "$61.55", revenue: "$22.94" },
        { date: "May 22, 2026", impressions: "6,764", clicks: "228", ctr: "3.37%", ecpm: "$61.04", revenue: "$22.62" },
        { date: "May 21, 2026", impressions: "6,738", clicks: "226", ctr: "3.35%", ecpm: "$60.55", revenue: "$22.35" },
        { date: "May 20, 2026", impressions: "6,712", clicks: "224", ctr: "3.34%", ecpm: "$60.02", revenue: "$22.10" },
        { date: "May 19, 2026", impressions: "6,680", clicks: "222", ctr: "3.32%", ecpm: "$59.44", revenue: "$21.88" },
      ],
      Desktop: [
        { date: "Jun 17, 2026", impressions: "0", clicks: "0", ctr: "0.00%", ecpm: "$0.00", revenue: "$0.00" },
        { date: "Jun 16, 2026", impressions: "0", clicks: "0", ctr: "0.00%", ecpm: "$0.00", revenue: "$0.00" },
        { date: "Jun 15, 2026", impressions: "0", clicks: "0", ctr: "0.00%", ecpm: "$0.00", revenue: "$0.00" },
        { date: "Jun 14, 2026", impressions: "259", clicks: "8", ctr: "3.24%", ecpm: "$61.77", revenue: "$0.53" },
        { date: "Jun 13, 2026", impressions: "205", clicks: "8", ctr: "3.80%", ecpm: "$59.88", revenue: "$0.19" },
        { date: "Jun 12, 2026", impressions: "4,123", clicks: "145", ctr: "3.52%", ecpm: "$66.98", revenue: "$13.81" },
        { date: "Jun 11, 2026", impressions: "4,038", clicks: "134", ctr: "3.33%", ecpm: "$61.44", revenue: "$13.47" },
        { date: "Jun 10, 2026", impressions: "3,992", clicks: "127", ctr: "3.19%", ecpm: "$57.98", revenue: "$13.19" },
        { date: "Jun 09, 2026", impressions: "4,070", clicks: "142", ctr: "3.50%", ecpm: "$65.33", revenue: "$13.74" },
        { date: "Jun 08, 2026", impressions: "4,056", clicks: "141", ctr: "3.48%", ecpm: "$64.10", revenue: "$13.53" },
        { date: "Jun 07, 2026", impressions: "4,038", clicks: "139", ctr: "3.45%", ecpm: "$62.44", revenue: "$13.32" },
        { date: "Jun 06, 2026", impressions: "4,021", clicks: "137", ctr: "3.42%", ecpm: "$61.33", revenue: "$13.14" },
        { date: "Jun 05, 2026", impressions: "4,002", clicks: "135", ctr: "3.37%", ecpm: "$60.55", revenue: "$12.97" },
        { date: "Jun 04, 2026", impressions: "3,985", clicks: "133", ctr: "3.34%", ecpm: "$59.88", revenue: "$12.80" },
        { date: "Jun 03, 2026", impressions: "3,971", clicks: "131", ctr: "3.31%", ecpm: "$59.12", revenue: "$12.63" },
        { date: "Jun 02, 2026", impressions: "3,955", clicks: "130", ctr: "3.27%", ecpm: "$58.44", revenue: "$12.44" },
        { date: "Jun 01, 2026", impressions: "3,943", clicks: "128", ctr: "3.24%", ecpm: "$57.66", revenue: "$12.25" },
        { date: "May 31, 2026", impressions: "3,926", clicks: "126", ctr: "3.21%", ecpm: "$56.77", revenue: "$12.07" },
        { date: "May 30, 2026", impressions: "4,185", clicks: "145", ctr: "3.47%", ecpm: "$65.00", revenue: "$14.64" },
        { date: "May 29, 2026", impressions: "4,175", clicks: "144", ctr: "3.46%", ecpm: "$64.55", revenue: "$14.55" },
        { date: "May 28, 2026", impressions: "4,163", clicks: "144", ctr: "3.46%", ecpm: "$64.00", revenue: "$14.46" },
        { date: "May 27, 2026", impressions: "4,146", clicks: "143", ctr: "3.44%", ecpm: "$63.55", revenue: "$14.33" },
        { date: "May 26, 2026", impressions: "4,129", clicks: "141", ctr: "3.43%", ecpm: "$63.00", revenue: "$14.20" },
        { date: "May 25, 2026", impressions: "4,110", clicks: "140", ctr: "3.41%", ecpm: "$62.48", revenue: "$14.04" },
        { date: "May 24, 2026", impressions: "4,093", clicks: "139", ctr: "3.40%", ecpm: "$62.02", revenue: "$13.89" },
        { date: "May 23, 2026", impressions: "4,074", clicks: "138", ctr: "3.39%", ecpm: "$61.55", revenue: "$13.76" },
        { date: "May 22, 2026", impressions: "4,058", clicks: "137", ctr: "3.37%", ecpm: "$61.04", revenue: "$13.59" },
        { date: "May 21, 2026", impressions: "4,043", clicks: "136", ctr: "3.35%", ecpm: "$60.55", revenue: "$13.45" },
        { date: "May 20, 2026", impressions: "4,027", clicks: "134", ctr: "3.34%", ecpm: "$60.02", revenue: "$13.26" },
        { date: "May 19, 2026", impressions: "4,008", clicks: "133", ctr: "3.32%", ecpm: "$59.44", revenue: "$13.13" },
      ],
      Mobile: [
        { date: "Jun 17, 2026", impressions: "0", clicks: "0", ctr: "0.00%", ecpm: "$0.00", revenue: "$0.00" },
        { date: "Jun 16, 2026", impressions: "0", clicks: "0", ctr: "0.00%", ecpm: "$0.00", revenue: "$0.00" },
        { date: "Jun 15, 2026", impressions: "0", clicks: "0", ctr: "0.00%", ecpm: "$0.00", revenue: "$0.00" },
        { date: "Jun 14, 2026", impressions: "173", clicks: "6", ctr: "3.24%", ecpm: "$61.77", revenue: "$0.36" },
        { date: "Jun 13, 2026", impressions: "137", clicks: "5", ctr: "3.80%", ecpm: "$59.88", revenue: "$0.13" },
        { date: "Jun 12, 2026", impressions: "2,748", clicks: "97", ctr: "3.52%", ecpm: "$66.98", revenue: "$9.20" },
        { date: "Jun 11, 2026", impressions: "2,692", clicks: "90", ctr: "3.33%", ecpm: "$61.44", revenue: "$8.98" },
        { date: "Jun 10, 2026", impressions: "2,662", clicks: "85", ctr: "3.19%", ecpm: "$57.98", revenue: "$8.80" },
        { date: "Jun 09, 2026", impressions: "2,713", clicks: "95", ctr: "3.50%", ecpm: "$65.33", revenue: "$9.16" },
        { date: "Jun 08, 2026", impressions: "2,704", clicks: "94", ctr: "3.48%", ecpm: "$64.10", revenue: "$9.02" },
        { date: "Jun 07, 2026", impressions: "2,692", clicks: "93", ctr: "3.45%", ecpm: "$62.44", revenue: "$8.88" },
        { date: "Jun 06, 2026", impressions: "2,680", clicks: "92", ctr: "3.42%", ecpm: "$61.33", revenue: "$8.76" },
        { date: "Jun 05, 2026", impressions: "2,668", clicks: "90", ctr: "3.37%", ecpm: "$60.55", revenue: "$8.64" },
        { date: "Jun 04, 2026", impressions: "2,657", clicks: "89", ctr: "3.34%", ecpm: "$59.88", revenue: "$8.53" },
        { date: "Jun 03, 2026", impressions: "2,647", clicks: "88", ctr: "3.31%", ecpm: "$59.12", revenue: "$8.42" },
        { date: "Jun 02, 2026", impressions: "2,637", clicks: "86", ctr: "3.27%", ecpm: "$58.44", revenue: "$8.29" },
        { date: "Jun 01, 2026", impressions: "2,625", clicks: "85", ctr: "3.24%", ecpm: "$57.66", revenue: "$8.17" },
        { date: "May 31, 2026", impressions: "2,617", clicks: "84", ctr: "3.21%", ecpm: "$56.77", revenue: "$8.04" },
        { date: "May 30, 2026", impressions: "2,790", clicks: "97", ctr: "3.47%", ecpm: "$65.00", revenue: "$9.76" },
        { date: "May 29, 2026", impressions: "2,783", clicks: "97", ctr: "3.46%", ecpm: "$64.55", revenue: "$9.70" },
        { date: "May 28, 2026", impressions: "2,775", clicks: "96", ctr: "3.46%", ecpm: "$64.00", revenue: "$9.64" },
        { date: "May 27, 2026", impressions: "2,764", clicks: "95", ctr: "3.44%", ecpm: "$63.55", revenue: "$9.55" },
        { date: "May 26, 2026", impressions: "2,752", clicks: "95", ctr: "3.43%", ecpm: "$63.00", revenue: "$9.46" },
        { date: "May 25, 2026", impressions: "2,740", clicks: "94", ctr: "3.41%", ecpm: "$62.48", revenue: "$9.36" },
        { date: "May 24, 2026", impressions: "2,729", clicks: "93", ctr: "3.40%", ecpm: "$62.02", revenue: "$9.26" },
        { date: "May 23, 2026", impressions: "2,716", clicks: "92", ctr: "3.39%", ecpm: "$61.55", revenue: "$9.18" },
        { date: "May 22, 2026", impressions: "2,706", clicks: "91", ctr: "3.37%", ecpm: "$61.04", revenue: "$9.03" },
        { date: "May 21, 2026", impressions: "2,695", clicks: "90", ctr: "3.35%", ecpm: "$60.55", revenue: "$8.90" },
        { date: "May 20, 2026", impressions: "2,685", clicks: "90", ctr: "3.34%", ecpm: "$60.02", revenue: "$8.84" },
        { date: "May 19, 2026", impressions: "2,672", clicks: "89", ctr: "3.32%", ecpm: "$59.44", revenue: "$8.75" },
      ],
    },
  },
  "Last 3 Months": {
    "All Countries": {
      "All Devices": [
        { date: "Mar 19, 2026", impressions: "5,543", clicks: "180", ctr: "3.25%", ecpm: "$52.55", revenue: "$18.33" },
        { date: "Mar 20, 2026", impressions: "5,570", clicks: "182", ctr: "3.26%", ecpm: "$53.10", revenue: "$18.61" },
        { date: "Mar 21, 2026", impressions: "5,601", clicks: "184", ctr: "3.27%", ecpm: "$53.88", revenue: "$18.95" },
        { date: "Mar 22, 2026", impressions: "5,625", clicks: "185", ctr: "3.29%", ecpm: "$54.33", revenue: "$19.22" },
        { date: "Apr 15, 2026", impressions: "6,243", clicks: "210", ctr: "3.36%", ecpm: "$60.55", revenue: "$21.35" },
        { date: "Apr 16, 2026", impressions: "6,310", clicks: "214", ctr: "3.39%", ecpm: "$61.88", revenue: "$21.95" },
        { date: "Apr 17, 2026", impressions: "6,445", clicks: "220", ctr: "3.41%", ecpm: "$62.44", revenue: "$22.68" },
        { date: "May 10, 2026", impressions: "6,543", clicks: "225", ctr: "3.44%", ecpm: "$63.00", revenue: "$22.99" },
        { date: "May 15, 2026", impressions: "6,620", clicks: "230", ctr: "3.47%", ecpm: "$64.10", revenue: "$23.55" },
        { date: "May 20, 2026", impressions: "6,712", clicks: "224", ctr: "3.34%", ecpm: "$60.02", revenue: "$22.10" },
        { date: "May 25, 2026", impressions: "6,850", clicks: "234", ctr: "3.41%", ecpm: "$62.48", revenue: "$23.40" },
        { date: "May 30, 2026", impressions: "6,975", clicks: "242", ctr: "3.47%", ecpm: "$65.00", revenue: "$24.40" },
        { date: "Jun 05, 2026", impressions: "6,670", clicks: "225", ctr: "3.37%", ecpm: "$60.55", revenue: "$21.61" },
        { date: "Jun 10, 2026", impressions: "6,654", clicks: "212", ctr: "3.19%", ecpm: "$57.98", revenue: "$21.99" },
        { date: "Jun 14, 2026", impressions: "432", clicks: "14", ctr: "3.24%", ecpm: "$61.77", revenue: "$0.89" },
      ],
      Desktop: [
        { date: "Mar 19, 2026", impressions: "3,326", clicks: "108", ctr: "3.25%", ecpm: "$52.55", revenue: "$11.00" },
        { date: "Mar 20, 2026", impressions: "3,342", clicks: "109", ctr: "3.26%", ecpm: "$53.10", revenue: "$11.17" },
        { date: "Mar 21, 2026", impressions: "3,361", clicks: "110", ctr: "3.27%", ecpm: "$53.88", revenue: "$11.37" },
        { date: "Mar 22, 2026", impressions: "3,375", clicks: "111", ctr: "3.29%", ecpm: "$54.33", revenue: "$11.53" },
        { date: "Apr 15, 2026", impressions: "3,746", clicks: "126", ctr: "3.36%", ecpm: "$60.55", revenue: "$12.81" },
        { date: "Apr 16, 2026", impressions: "3,786", clicks: "128", ctr: "3.39%", ecpm: "$61.88", revenue: "$13.17" },
        { date: "Apr 17, 2026", impressions: "3,867", clicks: "132", ctr: "3.41%", ecpm: "$62.44", revenue: "$13.61" },
        { date: "May 10, 2026", impressions: "3,926", clicks: "135", ctr: "3.44%", ecpm: "$63.00", revenue: "$13.80" },
        { date: "May 15, 2026", impressions: "3,972", clicks: "138", ctr: "3.47%", ecpm: "$64.10", revenue: "$14.13" },
        { date: "May 20, 2026", impressions: "4,027", clicks: "134", ctr: "3.34%", ecpm: "$60.02", revenue: "$13.26" },
        { date: "May 25, 2026", impressions: "4,110", clicks: "140", ctr: "3.41%", ecpm: "$62.48", revenue: "$14.04" },
        { date: "May 30, 2026", impressions: "4,185", clicks: "145", ctr: "3.47%", ecpm: "$65.00", revenue: "$14.64" },
        { date: "Jun 05, 2026", impressions: "4,002", clicks: "135", ctr: "3.37%", ecpm: "$60.55", revenue: "$12.97" },
        { date: "Jun 10, 2026", impressions: "3,992", clicks: "127", ctr: "3.19%", ecpm: "$57.98", revenue: "$13.19" },
        { date: "Jun 14, 2026", impressions: "259", clicks: "8", ctr: "3.24%", ecpm: "$61.77", revenue: "$0.53" },
      ],
      Mobile: [
        { date: "Mar 19, 2026", impressions: "2,217", clicks: "72", ctr: "3.25%", ecpm: "$52.55", revenue: "$7.33" },
        { date: "Mar 20, 2026", impressions: "2,228", clicks: "73", ctr: "3.26%", ecpm: "$53.10", revenue: "$7.44" },
        { date: "Mar 21, 2026", impressions: "2,240", clicks: "74", ctr: "3.27%", ecpm: "$53.88", revenue: "$7.58" },
        { date: "Mar 22, 2026", impressions: "2,250", clicks: "74", ctr: "3.29%", ecpm: "$54.33", revenue: "$7.69" },
        { date: "Apr 15, 2026", impressions: "2,497", clicks: "84", ctr: "3.36%", ecpm: "$60.55", revenue: "$8.54" },
        { date: "Apr 16, 2026", impressions: "2,524", clicks: "86", ctr: "3.39%", ecpm: "$61.88", revenue: "$8.78" },
        { date: "Apr 17, 2026", impressions: "2,578", clicks: "88", ctr: "3.41%", ecpm: "$62.44", revenue: "$9.07" },
        { date: "May 10, 2026", impressions: "2,617", clicks: "90", ctr: "3.44%", ecpm: "$63.00", revenue: "$9.19" },
        { date: "May 15, 2026", impressions: "2,648", clicks: "92", ctr: "3.47%", ecpm: "$64.10", revenue: "$9.42" },
        { date: "May 20, 2026", impressions: "2,685", clicks: "90", ctr: "3.34%", ecpm: "$60.02", revenue: "$8.84" },
        { date: "May 25, 2026", impressions: "2,740", clicks: "94", ctr: "3.41%", ecpm: "$62.48", revenue: "$9.36" },
        { date: "May 30, 2026", impressions: "2,790", clicks: "97", ctr: "3.47%", ecpm: "$65.00", revenue: "$9.76" },
        { date: "Jun 05, 2026", impressions: "2,668", clicks: "90", ctr: "3.37%", ecpm: "$60.55", revenue: "$8.64" },
        { date: "Jun 10, 2026", impressions: "2,662", clicks: "85", ctr: "3.19%", ecpm: "$57.98", revenue: "$8.80" },
        { date: "Jun 14, 2026", impressions: "173", clicks: "6", ctr: "3.24%", ecpm: "$61.77", revenue: "$0.36" },
      ],
    },
  },
  "Last 6 Months": {
    "All Countries": {
      "All Devices": [
        { date: "May 30, 2026", impressions: "6,975", clicks: "242", ctr: "3.47%", ecpm: "$65.00", revenue: "$24.40" },
        { date: "May 29, 2026", impressions: "6,958", clicks: "241", ctr: "3.46%", ecpm: "$64.55", revenue: "$24.25" },
        { date: "May 28, 2026", impressions: "6,938", clicks: "240", ctr: "3.46%", ecpm: "$64.00", revenue: "$24.10" },
        { date: "May 27, 2026", impressions: "6,910", clicks: "238", ctr: "3.44%", ecpm: "$63.55", revenue: "$23.88" },
        { date: "May 26, 2026", impressions: "6,881", clicks: "236", ctr: "3.43%", ecpm: "$63.00", revenue: "$23.66" },
        { date: "May 25, 2026", impressions: "6,850", clicks: "234", ctr: "3.41%", ecpm: "$62.48", revenue: "$23.40" },
        { date: "May 24, 2026", impressions: "6,822", clicks: "232", ctr: "3.40%", ecpm: "$62.02", revenue: "$23.15" },
        { date: "May 23, 2026", impressions: "6,790", clicks: "230", ctr: "3.39%", ecpm: "$61.55", revenue: "$22.94" },
        { date: "May 22, 2026", impressions: "6,764", clicks: "228", ctr: "3.37%", ecpm: "$61.04", revenue: "$22.62" },
        { date: "May 21, 2026", impressions: "6,738", clicks: "226", ctr: "3.35%", ecpm: "$60.55", revenue: "$22.35" },
      ],
      Desktop: [
        { date: "May 30, 2026", impressions: "4,185", clicks: "145", ctr: "3.47%", ecpm: "$65.00", revenue: "$14.64" },
        { date: "May 29, 2026", impressions: "4,175", clicks: "144", ctr: "3.46%", ecpm: "$64.55", revenue: "$14.55" },
        { date: "May 28, 2026", impressions: "4,163", clicks: "144", ctr: "3.46%", ecpm: "$64.00", revenue: "$14.46" },
        { date: "May 27, 2026", impressions: "4,146", clicks: "143", ctr: "3.44%", ecpm: "$63.55", revenue: "$14.33" },
        { date: "May 26, 2026", impressions: "4,129", clicks: "141", ctr: "3.43%", ecpm: "$63.00", revenue: "$14.20" },
        { date: "May 25, 2026", impressions: "4,110", clicks: "140", ctr: "3.41%", ecpm: "$62.48", revenue: "$14.04" },
        { date: "May 24, 2026", impressions: "4,093", clicks: "139", ctr: "3.40%", ecpm: "$62.02", revenue: "$13.89" },
        { date: "May 23, 2026", impressions: "4,074", clicks: "138", ctr: "3.39%", ecpm: "$61.55", revenue: "$13.76" },
        { date: "May 22, 2026", impressions: "4,058", clicks: "137", ctr: "3.37%", ecpm: "$61.04", revenue: "$13.59" },
        { date: "May 21, 2026", impressions: "4,043", clicks: "136", ctr: "3.35%", ecpm: "$60.55", revenue: "$13.45" },
      ],
      Mobile: [
        { date: "May 30, 2026", impressions: "2,790", clicks: "97", ctr: "3.47%", ecpm: "$65.00", revenue: "$9.76" },
        { date: "May 29, 2026", impressions: "2,783", clicks: "97", ctr: "3.46%", ecpm: "$64.55", revenue: "$9.70" },
        { date: "May 28, 2026", impressions: "2,775", clicks: "96", ctr: "3.46%", ecpm: "$64.00", revenue: "$9.64" },
        { date: "May 27, 2026", impressions: "2,764", clicks: "95", ctr: "3.44%", ecpm: "$63.55", revenue: "$9.55" },
        { date: "May 26, 2026", impressions: "2,752", clicks: "95", ctr: "3.43%", ecpm: "$63.00", revenue: "$9.46" },
        { date: "May 25, 2026", impressions: "2,740", clicks: "94", ctr: "3.41%", ecpm: "$62.48", revenue: "$9.36" },
        { date: "May 24, 2026", impressions: "2,729", clicks: "93", ctr: "3.40%", ecpm: "$62.02", revenue: "$9.26" },
        { date: "May 23, 2026", impressions: "2,716", clicks: "92", ctr: "3.39%", ecpm: "$61.55", revenue: "$9.18" },
        { date: "May 22, 2026", impressions: "2,706", clicks: "91", ctr: "3.37%", ecpm: "$61.04", revenue: "$9.03" },
        { date: "May 21, 2026", impressions: "2,695", clicks: "90", ctr: "3.35%", ecpm: "$60.55", revenue: "$8.90" },
      ],
    },
  },
  "This Year": {
    "All Countries": {
      "All Devices": [
        { date: "Jun 14, 2026", impressions: "432", clicks: "14", ctr: "3.24%", ecpm: "$61.77", revenue: "$0.89" },
        { date: "Jun 13, 2026", impressions: "342", clicks: "13", ctr: "3.80%", ecpm: "$59.88", revenue: "$0.32" },
        { date: "Jun 12, 2026", impressions: "6,871", clicks: "242", ctr: "3.52%", ecpm: "$66.98", revenue: "$23.01" },
        { date: "Jun 11, 2026", impressions: "6,730", clicks: "224", ctr: "3.33%", ecpm: "$61.44", revenue: "$22.45" },
        { date: "Jun 10, 2026", impressions: "6,654", clicks: "212", ctr: "3.19%", ecpm: "$57.98", revenue: "$21.99" },
        { date: "Jun 09, 2026", impressions: "6,783", clicks: "237", ctr: "3.50%", ecpm: "$65.33", revenue: "$22.90" },
        { date: "Jun 08, 2026", impressions: "6,760", clicks: "235", ctr: "3.48%", ecpm: "$64.10", revenue: "$22.55" },
        { date: "Jun 07, 2026", impressions: "6,730", clicks: "232", ctr: "3.45%", ecpm: "$62.44", revenue: "$22.20" },
        { date: "Jun 06, 2026", impressions: "6,701", clicks: "229", ctr: "3.42%", ecpm: "$61.33", revenue: "$21.90" },
        { date: "Jun 05, 2026", impressions: "6,670", clicks: "225", ctr: "3.37%", ecpm: "$60.55", revenue: "$21.61" },
      ],
      Desktop: [
        { date: "Jun 14, 2026", impressions: "259", clicks: "8", ctr: "3.24%", ecpm: "$61.77", revenue: "$0.53" },
        { date: "Jun 13, 2026", impressions: "205", clicks: "8", ctr: "3.80%", ecpm: "$59.88", revenue: "$0.19" },
        { date: "Jun 12, 2026", impressions: "4,123", clicks: "145", ctr: "3.52%", ecpm: "$66.98", revenue: "$13.81" },
        { date: "Jun 11, 2026", impressions: "4,038", clicks: "134", ctr: "3.33%", ecpm: "$61.44", revenue: "$13.47" },
        { date: "Jun 10, 2026", impressions: "3,992", clicks: "127", ctr: "3.19%", ecpm: "$57.98", revenue: "$13.19" },
        { date: "Jun 09, 2026", impressions: "4,070", clicks: "142", ctr: "3.50%", ecpm: "$65.33", revenue: "$13.74" },
        { date: "Jun 08, 2026", impressions: "4,056", clicks: "141", ctr: "3.48%", ecpm: "$64.10", revenue: "$13.53" },
        { date: "Jun 07, 2026", impressions: "4,038", clicks: "139", ctr: "3.45%", ecpm: "$62.44", revenue: "$13.32" },
        { date: "Jun 06, 2026", impressions: "4,021", clicks: "137", ctr: "3.42%", ecpm: "$61.33", revenue: "$13.14" },
        { date: "Jun 05, 2026", impressions: "4,002", clicks: "135", ctr: "3.37%", ecpm: "$60.55", revenue: "$12.97" },
      ],
      Mobile: [
        { date: "Jun 14, 2026", impressions: "173", clicks: "6", ctr: "3.24%", ecpm: "$61.77", revenue: "$0.36" },
        { date: "Jun 13, 2026", impressions: "137", clicks: "5", ctr: "3.80%", ecpm: "$59.88", revenue: "$0.13" },
        { date: "Jun 12, 2026", impressions: "2,748", clicks: "97", ctr: "3.52%", ecpm: "$66.98", revenue: "$9.20" },
        { date: "Jun 11, 2026", impressions: "2,692", clicks: "90", ctr: "3.33%", ecpm: "$61.44", revenue: "$8.98" },
        { date: "Jun 10, 2026", impressions: "2,662", clicks: "85", ctr: "3.19%", ecpm: "$57.98", revenue: "$8.80" },
        { date: "Jun 09, 2026", impressions: "2,713", clicks: "95", ctr: "3.50%", ecpm: "$65.33", revenue: "$9.16" },
        { date: "Jun 08, 2026", impressions: "2,704", clicks: "94", ctr: "3.48%", ecpm: "$64.10", revenue: "$9.02" },
        { date: "Jun 07, 2026", impressions: "2,692", clicks: "93", ctr: "3.45%", ecpm: "$62.44", revenue: "$8.88" },
        { date: "Jun 06, 2026", impressions: "2,680", clicks: "92", ctr: "3.42%", ecpm: "$61.33", revenue: "$8.76" },
        { date: "Jun 05, 2026", impressions: "2,668", clicks: "90", ctr: "3.37%", ecpm: "$60.55", revenue: "$8.64" },
      ],
    },
  },
  "Custom Range": {
    "All Countries": {
      "All Devices": [
        { date: "Jun 14, 2026", impressions: "432", clicks: "14", ctr: "3.24%", ecpm: "$61.77", revenue: "$0.89" },
        { date: "Jun 13, 2026", impressions: "342", clicks: "13", ctr: "3.80%", ecpm: "$59.88", revenue: "$0.32" },
        { date: "Jun 12, 2026", impressions: "6,871", clicks: "242", ctr: "3.52%", ecpm: "$66.98", revenue: "$23.01" },
        { date: "Jun 11, 2026", impressions: "6,730", clicks: "224", ctr: "3.33%", ecpm: "$61.44", revenue: "$22.45" },
        { date: "Jun 10, 2026", impressions: "6,654", clicks: "212", ctr: "3.19%", ecpm: "$57.98", revenue: "$21.99" },
        { date: "Jun 09, 2026", impressions: "6,783", clicks: "237", ctr: "3.50%", ecpm: "$65.33", revenue: "$22.90" },
        { date: "Jun 08, 2026", impressions: "6,760", clicks: "235", ctr: "3.48%", ecpm: "$64.10", revenue: "$22.55" },
        { date: "Jun 07, 2026", impressions: "6,730", clicks: "232", ctr: "3.45%", ecpm: "$62.44", revenue: "$22.20" },
        { date: "Jun 06, 2026", impressions: "6,701", clicks: "229", ctr: "3.42%", ecpm: "$61.33", revenue: "$21.90" },
        { date: "Jun 05, 2026", impressions: "6,670", clicks: "225", ctr: "3.37%", ecpm: "$60.55", revenue: "$21.61" },
      ],
      Desktop: [
        { date: "Jun 14, 2026", impressions: "259", clicks: "8", ctr: "3.24%", ecpm: "$61.77", revenue: "$0.53" },
        { date: "Jun 13, 2026", impressions: "205", clicks: "8", ctr: "3.80%", ecpm: "$59.88", revenue: "$0.19" },
        { date: "Jun 12, 2026", impressions: "4,123", clicks: "145", ctr: "3.52%", ecpm: "$66.98", revenue: "$13.81" },
        { date: "Jun 11, 2026", impressions: "4,038", clicks: "134", ctr: "3.33%", ecpm: "$61.44", revenue: "$13.47" },
        { date: "Jun 10, 2026", impressions: "3,992", clicks: "127", ctr: "3.19%", ecpm: "$57.98", revenue: "$13.19" },
        { date: "Jun 09, 2026", impressions: "4,070", clicks: "142", ctr: "3.50%", ecpm: "$65.33", revenue: "$13.74" },
        { date: "Jun 08, 2026", impressions: "4,056", clicks: "141", ctr: "3.48%", ecpm: "$64.10", revenue: "$13.53" },
        { date: "Jun 07, 2026", impressions: "4,038", clicks: "139", ctr: "3.45%", ecpm: "$62.44", revenue: "$13.32" },
        { date: "Jun 06, 2026", impressions: "4,021", clicks: "137", ctr: "3.42%", ecpm: "$61.33", revenue: "$13.14" },
        { date: "Jun 05, 2026", impressions: "4,002", clicks: "135", ctr: "3.37%", ecpm: "$60.55", revenue: "$12.97" },
      ],
      Mobile: [
        { date: "Jun 14, 2026", impressions: "173", clicks: "6", ctr: "3.24%", ecpm: "$61.77", revenue: "$0.36" },
        { date: "Jun 13, 2026", impressions: "137", clicks: "5", ctr: "3.80%", ecpm: "$59.88", revenue: "$0.13" },
        { date: "Jun 12, 2026", impressions: "2,748", clicks: "97", ctr: "3.52%", ecpm: "$66.98", revenue: "$9.20" },
        { date: "Jun 11, 2026", impressions: "2,692", clicks: "90", ctr: "3.33%", ecpm: "$61.44", revenue: "$8.98" },
        { date: "Jun 10, 2026", impressions: "2,662", clicks: "85", ctr: "3.19%", ecpm: "$57.98", revenue: "$8.80" },
        { date: "Jun 09, 2026", impressions: "2,713", clicks: "95", ctr: "3.50%", ecpm: "$65.33", revenue: "$9.16" },
        { date: "Jun 08, 2026", impressions: "2,704", clicks: "94", ctr: "3.48%", ecpm: "$64.10", revenue: "$9.02" },
        { date: "Jun 07, 2026", impressions: "2,692", clicks: "93", ctr: "3.45%", ecpm: "$62.44", revenue: "$8.88" },
        { date: "Jun 06, 2026", impressions: "2,680", clicks: "92", ctr: "3.42%", ecpm: "$61.33", revenue: "$8.76" },
        { date: "Jun 05, 2026", impressions: "2,668", clicks: "90", ctr: "3.37%", ecpm: "$60.55", revenue: "$8.64" },
      ],
    },
  },
}

const statisticsTotals = {
  impressions: 67776,
  clicks: 2342,
  revenue: 239.29,
  ecpm: 62.78,
  ctr: 3.45,
}

export function ReportContent() {
  // Generate unified report data with automatic date system
  const { allDevicesData, desktopData, mobileData } = useMemo(() => {
    // Collect all unique data from baseReportData across all date ranges
    const allDevicesSet = new Map<string, FormattedDailyData>()
    const desktopSet = new Map<string, FormattedDailyData>()
    const mobileSet = new Map<string, FormattedDailyData>()

    // Iterate through all date ranges and collect data
    Object.values(baseReportData).forEach((dateRangeData) => {
      const allCountries = dateRangeData["All Countries"]
      if (allCountries) {
        allCountries["All Devices"]?.forEach((item) => allDevicesSet.set(item.date, item))
        allCountries["Desktop"]?.forEach((item) => desktopSet.set(item.date, item))
        allCountries["Mobile"]?.forEach((item) => mobileSet.set(item.date, item))
      }
    })

    // Convert to arrays and sort newest first
    const allDevices = Array.from(allDevicesSet.values())
    const desktop = Array.from(desktopSet.values())
    const mobile = Array.from(mobileSet.values())

    // Generate missing entries from oldest to today
    const oldestDate = allDevices.length > 0 ? allDevices[allDevices.length - 1].date : new Date().toLocaleDateString()
    const missingAll = generateAllMissingEntries(allDevices, oldestDate)
    const missingDesktop = generateAllMissingEntries(desktop, oldestDate)
    const missingMobile = generateAllMissingEntries(mobile, oldestDate)

    // Combine and sort newest first
    const allDevicesData = [...allDevices, ...missingAll].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    )
    const desktopData = [...desktop, ...missingDesktop].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    )
    const mobileData = [...mobile, ...missingMobile].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    )

    return { allDevicesData, desktopData, mobileData }
  }, [])

  const [showReport] = useState(true)
  const [selectedDateRange, setSelectedDateRange] = useState("Last 7 Days")
  const [selectedGroupBy, setSelectedGroupBy] = useState("Day")
  const [selectedMetrics, setSelectedMetrics] = useState("All Metrics")
  const [selectedSite, setSelectedSite] = useState("All Sites")
  const [selectedCountry, setSelectedCountry] = useState("All Countries")
  const [selectedDevice, setSelectedDevice] = useState("All Devices")
  const [isFiltered, setIsFiltered] = useState(false)

  // Dynamically filter data based on selected date range and device
  const currentReportData = useMemo(() => {
    const sourceData =
      selectedDevice === "All Devices" ? allDevicesData : selectedDevice === "Desktop" ? desktopData : mobileData

    const filteredByRange = getDataForDateRange(sourceData, selectedDateRange)
    return filteredByRange
  }, [selectedDateRange, selectedDevice, allDevicesData, desktopData, mobileData])

  const handleGenerateReport = () => {
    // Data already rendered, no action needed
  }

  const handleRefresh = () => {
    // Data already current, no action needed
  }

  const handleApplyFilters = () => {
    setIsFiltered(true)
  }

  const handleReset = () => {
    setSelectedDateRange("Last 7 Days")
    setSelectedGroupBy("Day")
    setSelectedMetrics("All Metrics")
    setSelectedSite("All Sites")
    setSelectedCountry("All Countries")
    setSelectedDevice("All Devices")
    setIsFiltered(false)
  }

  const calculateTotals = () => {
    if (currentReportData.length === 0) {
      return {
        totalRevenue: statisticsTotals.revenue.toFixed(3),
        totalImpressions: statisticsTotals.impressions.toLocaleString(),
        totalClicks: statisticsTotals.clicks.toLocaleString(),
        avgCTR: `${statisticsTotals.ctr.toFixed(2)}%`,
        avgECPM: `$${statisticsTotals.ecpm.toFixed(2)}`,
      }
    }

    const totalRevenue = currentReportData.reduce((sum, row) => {
      const revenue = Number.parseFloat(row.revenue.replace("$", "").replace(",", ""))
      return sum + revenue
    }, 0)

    const totalImpressions = currentReportData.reduce((sum, row) => {
      const impressions = Number.parseInt(row.impressions.replace(",", ""))
      return sum + impressions
    }, 0)

    const totalClicks = currentReportData.reduce((sum, row) => {
      const clicks = Number.parseInt(row.clicks.replace(",", ""))
      return sum + clicks
    }, 0)

    const avgCTR = totalImpressions > 0 ? ((totalClicks / totalImpressions) * 100).toFixed(2) : "0.00"
    const avgECPM = totalImpressions > 0 ? ((totalRevenue / totalImpressions) * 1000).toFixed(2) : "0.00"

    return {
      totalRevenue: totalRevenue.toFixed(3),
      totalImpressions: totalImpressions.toLocaleString(),
      totalClicks: totalClicks.toLocaleString(),
      avgCTR: `${avgCTR}%`,
      avgECPM: `$${avgECPM}`,
    }
  }

  const totals = calculateTotals()

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <h1 className="text-2xl font-bold">Reports</h1>
        <div className="flex items-center space-x-2 flex-wrap gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" className="flex items-center bg-transparent" onClick={handleRefresh}>
                  <RefreshCw size={16} className="mr-2" />
                  Refresh
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Refresh report data</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" className="flex items-center bg-transparent">
                  <Download size={16} className="mr-2" />
                  Export
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Export report as CSV</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>

      <Card className="p-6">
        <div className="flex items-center mb-4">
          <Filter size={18} className="mr-2" />
          <h3 className="font-medium">Report Filters</h3>
          {isFiltered && (
            <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">Filters Applied</span>
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="text-sm font-medium mb-1 block">Date Range</label>
            <select
              className="w-full p-2 border rounded-md bg-white"
              value={selectedDateRange}
              onChange={(e) => setSelectedDateRange(e.target.value)}
            >
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
              <option>Last 3 Months</option>
              <option>Last 6 Months</option>
              <option>This Year</option>
              <option>Custom Range</option>
            </select>
          </div>
          <div>
            <label className="text-sm font-medium mb-1 block">Group By</label>
            <select
              className="w-full p-2 border rounded-md bg-white"
              value={selectedGroupBy}
              onChange={(e) => setSelectedGroupBy(e.target.value)}
            >
              <option>Hour</option>
              <option>Day</option>
              <option>Week</option>
              <option>Month</option>
            </select>
          </div>
          <div>
            <label className="text-sm font-medium mb-1 block">Metrics</label>
            <select
              className="w-full p-2 border rounded-md bg-white"
              value={selectedMetrics}
              onChange={(e) => setSelectedMetrics(e.target.value)}
            >
              <option>All Metrics</option>
              <option>Revenue Only</option>
              <option>Traffic Only</option>
              <option>Performance Only</option>
            </select>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          <div>
            <label className="text-sm font-medium mb-1 block">Sites</label>
            <select
              className="w-full p-2 border rounded-md bg-white"
              value={selectedSite}
              onChange={(e) => setSelectedSite(e.target.value)}
            >
              <option>https://edudegrehub.com</option>
              <option>All Sites</option>
            </select>
          </div>
          <div>
            <label className="text-sm font-medium mb-1 block">Countries</label>
            <select
              className="w-full p-2 border rounded-md bg-white"
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
            >
              <option>All Countries</option>
              <option>United States</option>
              <option>United Kingdom</option>
              <option>Canada</option>
              <option>Australia</option>
            </select>
          </div>
          <div>
            <label className="text-sm font-medium mb-1 block">Device</label>
            <select
              className="w-full p-2 border rounded-md bg-white"
              value={selectedDevice}
              onChange={(e) => setSelectedDevice(e.target.value)}
            >
              <option>All Devices</option>
              <option>Desktop</option>
              <option>Mobile</option>
              <option>Tablet</option>
            </select>
          </div>
          <div className="flex items-end gap-2">
            <Button className="bg-green-500 hover:bg-green-600 flex-1" onClick={handleApplyFilters}>
              Apply Filters
            </Button>
            <Button variant="outline" onClick={handleReset} className="bg-transparent">
              Reset
            </Button>
          </div>
        </div>

        {/* Filter Summary */}
        <div className="mt-4 p-3 bg-gray-50 rounded-lg">
          <div className="text-sm text-gray-600">
            <strong>Current Filters:</strong> {selectedDateRange} • {selectedGroupBy} • {selectedSite} •{" "}
            {selectedCountry} • {selectedDevice} • {selectedMetrics}
          </div>
        </div>
      </Card>

      {/* Statistics Summary - Always visible */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="bg-green-50 p-4 rounded-lg text-center">
          <div className="text-sm text-gray-600 mb-1">Total Revenue</div>
          <div className="text-xl font-bold text-gray-800">{totals.totalRevenue}</div>
        </div>
        <div className="bg-blue-50 p-4 rounded-lg text-center">
          <div className="text-sm text-gray-600 mb-1">Total Impressions</div>
          <div className="text-xl font-bold text-gray-800">{totals.totalImpressions}</div>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg text-center">
          <div className="text-sm text-gray-600 mb-1">Total Clicks</div>
          <div className="text-xl font-bold text-gray-800">{totals.totalClicks}</div>
        </div>
        <div className="bg-orange-50 p-4 rounded-lg text-center">
          <div className="text-sm text-gray-600 mb-1">Average CTR</div>
          <div className="text-xl font-bold text-gray-800">{totals.avgCTR}</div>
        </div>
        <div className="bg-indigo-50 p-4 rounded-lg text-center">
          <div className="text-sm text-gray-600 mb-1">Average eCPM</div>
          <div className="text-xl font-bold text-gray-800">{totals.avgECPM}</div>
        </div>
      </div>

      {/* Report Table */}
      {showReport && (
        <Card className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium">Report Results</h3>
            <div className="text-sm text-gray-500">
              Generated on {new Date().toLocaleDateString()} at {new Date().toLocaleTimeString()}
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium text-sm h-12 align-middle">Date</th>
                  <th className="text-left py-3 px-4 font-medium text-sm h-12 align-middle">Impressions</th>
                  <th className="text-left py-3 px-4 font-medium text-sm h-12 align-middle">Clicks</th>
                  <th className="text-left py-3 px-4 font-medium text-sm h-12 align-middle">CTR</th>
                  <th className="text-left py-3 px-4 font-medium text-sm h-12 align-middle">eCPM</th>
                  <th className="text-left py-3 px-4 font-medium text-sm h-12 align-middle">Revenue</th>
                </tr>
              </thead>
              <tbody>
                {currentReportData.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-12 text-center">
                      <div className="text-gray-400">
                        <BarChart2 className="h-12 w-12 mx-auto mb-2" />
                        <p className="text-sm font-medium">No records available</p>
                        <p className="text-xs mt-1">Reports will be visible after data is added</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  currentReportData.map((row, index) => (
                    <ReportRow
                      key={index}
                      date={row.date}
                      impressions={row.impressions}
                      clicks={row.clicks}
                      ctr={row.ctr}
                      ecpm={row.ecpm}
                      revenue={row.revenue}
                    />
                  ))
                )}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </div>
  )
}

interface ReportRowProps {
  date: string
  impressions: string
  clicks: string
  ctr: string
  ecpm: string
  revenue: string
}

function ReportRow({ date, impressions, clicks, ctr, ecpm, revenue }: ReportRowProps) {
  return (
    <tr className="border-b hover:bg-gray-50 h-12">
      <td className="py-3 px-4 text-sm h-12 align-middle whitespace-nowrap">{date}</td>
      <td className="py-3 px-4 text-sm h-12 align-middle whitespace-nowrap">{impressions}</td>
      <td className="py-3 px-4 text-sm h-12 align-middle whitespace-nowrap">{clicks}</td>
      <td className="py-3 px-4 text-sm h-12 align-middle whitespace-nowrap">{ctr}</td>
      <td className="py-3 px-4 text-sm h-12 align-middle whitespace-nowrap">{ecpm}</td>
      <td className="py-3 px-4 text-sm font-medium h-12 align-middle whitespace-nowrap">{revenue}</td>
    </tr>
  )
}
