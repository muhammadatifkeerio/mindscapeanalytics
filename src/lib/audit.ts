/**
 * SOURCE OF TRUTH KEYWORDS: writeAuditRow, AuditOverride, atomic audit, gap socket
 * WHAT: Block-level audit writer. Default trail for every protected mutation.
 * WHY: Routers must not call logActivity(); the spine already knows resource, actor, and outcome.
 * WHERE: protected.ts after a successful mutation. Prisma AuditLog is not in the schema yet — this is the sanctioned SOT socket.
 */

import type { AuditOverride, Permission } from "@/lib/types";

export interface AuditRecord {
    permission: Permission;
    userId: string;
    entityId?: string;
    metadata?: Record<string, string>;
    override?: AuditOverride | false;
}

/**
 * SOURCE OF TRUTH KEYWORDS: writeAuditRow, audit:false, AuditOverride
 * WHAT: Persist (currently log) an audit row for a protected mutation.
 * WHY: Gap: no AuditLog model yet. Do not invent a second helper in routers. Wire Prisma here later.
 * WHERE: protected.ts mutation path only.
 */
export async function writeAuditRow(record: AuditRecord): Promise<void> {
    if (record.override === false) return;

    console.info("[AUDIT]", {
        permission: record.permission,
        userId: record.userId,
        entityId: record.entityId,
        entity: record.override?.entity,
        action: record.override?.action,
        metadata: record.metadata,
        at: new Date().toISOString(),
    });
}
