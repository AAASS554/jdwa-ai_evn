import { useEffect, useState } from "react";
import { getVersion } from "@tauri-apps/api/app";
import { motion } from "framer-motion";
import {
  Info,
  Loader2,
  Moon,
  ShieldCheck,
  Sparkles,
  Workflow,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import appIcon from "@/assets/icons/app-icon.png";
import jdwaWordmark from "@/assets/brand/jdwa-wordmark.png";

interface AboutSectionProps {
  isPortable: boolean;
}

const SUPPORTED_APPS = [
  "Claude Code",
  "ChatGPT",
  "Gemini",
  "Hermes",
  "OpenClaw",
];

const JDWA_VALUES = [
  {
    icon: Workflow,
    title: "项目交付",
    body: "围绕新项目启动、旧项目接手、配置迁移和交付验收，把重复流程沉淀成稳定方法。",
  },
  {
    icon: ShieldCheck,
    title: "工程可靠",
    body: "以 SQLite、原子写入、备份和清晰的配置边界保护关键数据，降低误操作成本。",
  },
  {
    icon: Sparkles,
    title: "效率标准化",
    body: "把常用 AI 编程工具的供应商、MCP、提示词和 Skills 管理收束到一个桌面入口。",
  },
];

export function AboutSection({ isPortable }: AboutSectionProps) {
  const [version, setVersion] = useState<string | null>(null);
  const [isLoadingVersion, setIsLoadingVersion] = useState(true);

  useEffect(() => {
    let active = true;

    void getVersion()
      .then((appVersion) => {
        if (active) setVersion(appVersion);
      })
      .catch((error) => {
        console.error("[AboutSection] Failed to load app version", error);
        if (active) setVersion(null);
      })
      .finally(() => {
        if (active) setIsLoadingVersion(false);
      });

    return () => {
      active = false;
    };
  }, []);

  const displayVersion = version ? `v${version}` : "unknown";

  return (
    <motion.section
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <header className="space-y-1">
        <h3 className="text-sm font-medium">关于 JDWA</h3>
        <p className="text-xs text-muted-foreground">
          记得晚安，把可复用的工程方法变成更稳的日常交付。
        </p>
      </header>

      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        className="rounded-xl border border-border bg-card/70 p-6 shadow-sm"
      >
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img src={appIcon} alt="JDWA" className="h-12 w-12 rounded-xl" />
              <div>
                <h4 className="text-xl font-semibold text-foreground">
                  JDWA 记得晚安
                </h4>
                <p className="text-sm text-muted-foreground">
                  AI 编程工具供应商与工作流管理桌面应用
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="outline" className="gap-1.5 bg-background/80">
                <span className="text-muted-foreground">版本</span>
                {isLoadingVersion ? (
                  <Loader2 className="h-3 w-3 animate-spin" />
                ) : (
                  <span className="font-medium">{displayVersion}</span>
                )}
              </Badge>
              {isPortable && (
                <Badge variant="secondary" className="gap-1.5">
                  <Info className="h-3 w-3" />
                  便携模式
                </Badge>
              )}
              <Badge variant="secondary" className="gap-1.5">
                <Moon className="h-3 w-3" />
                记得晚安
              </Badge>
            </div>
          </div>

          <img
            src={jdwaWordmark}
            alt="JDWA 记得晚安"
            className="max-h-24 w-full max-w-[360px] object-contain lg:max-w-[420px]"
          />
        </div>
      </motion.div>

      <div className="grid gap-3 md:grid-cols-3">
        {JDWA_VALUES.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.title}
              className="rounded-lg border border-border bg-card/60 p-4"
            >
              <div className="mb-3 flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-md bg-primary/10 text-primary">
                  <Icon className="h-4 w-4" />
                </span>
                <h4 className="text-sm font-medium">{item.title}</h4>
              </div>
              <p className="text-xs leading-5 text-muted-foreground">
                {item.body}
              </p>
            </div>
          );
        })}
      </div>

      <section className="space-y-3">
        <h3 className="text-sm font-medium">当前支持</h3>
        <div className="flex flex-wrap gap-2">
          {SUPPORTED_APPS.map((app) => (
            <Badge key={app} variant="outline" className="bg-background/80">
              {app}
            </Badge>
          ))}
        </div>
      </section>
    </motion.section>
  );
}
