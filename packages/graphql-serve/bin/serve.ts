#!/usr/bin/node
import { serve } from "../src/serveHandler";

serve().catch(e => {throw e});